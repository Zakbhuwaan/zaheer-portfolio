import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'ai' | 'database' | 'tools';
  color: string;
  proficiency: number; // 1-5 scale
}

@Component({
  selector: 'app-globe',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skills-globe-container">
      <canvas #globeCanvas class="globe-canvas"></canvas>
      <div class="globe-overlay">
        <h3 class="text-xl font-bold text-white mb-2">Skills Universe</h3>
        <p class="text-gray-300 text-sm">Interactive Technology Stack</p>
        <div class="mt-4 text-xs text-gray-400">
          <div class="flex items-center gap-2 mb-1">
            <div class="w-2 h-2 rounded-full bg-blue-400"></div>
            <span>Frontend</span>
          </div>
          <div class="flex items-center gap-2 mb-1">
            <div class="w-2 h-2 rounded-full bg-green-400"></div>
            <span>Backend</span>
          </div>
          <div class="flex items-center gap-2 mb-1">
            <div class="w-2 h-2 rounded-full bg-purple-400"></div>
            <span>AI/ML</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-orange-400"></div>
            <span>Database & Tools</span>
          </div>
        </div>
      </div>
      <div class="skill-tooltip" id="skillTooltip"></div>
    </div>
  `,
  styles: [`
    .skills-globe-container {
      position: relative;
      width: 100%;
      height: 450px;
      border-radius: 16px;
      overflow: hidden;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      cursor: grab;
    }
    
    .skills-globe-container:active {
      cursor: grabbing;
    }
    
    .globe-canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
    
    .globe-overlay {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 10;
      max-width: 200px;
    }
    
    .skill-tooltip {
      position: absolute;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s;
      z-index: 15;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  `]
})
export class GlobeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('globeCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private centralSphere!: THREE.Mesh;
  private skillMeshes: THREE.Mesh[] = [];
  private animationId!: number;
  private mouse = new THREE.Vector2();
  private raycaster = new THREE.Raycaster();
  private isMouseDown = false;
  private mouseX = 0;
  private mouseY = 0;

  // Your skills and technologies
  private skills: Skill[] = [
    // Frontend
    { name: 'Angular', category: 'frontend', color: '#3B82F6', proficiency: 4 },
    { name: 'React', category: 'frontend', color: '#3B82F6', proficiency: 4 },
    { name: 'TypeScript', category: 'frontend', color: '#3B82F6', proficiency: 4 },
    { name: 'Vue.js', category: 'frontend', color: '#3B82F6', proficiency: 3 },
    { name: 'Next.js', category: 'frontend', color: '#3B82F6', proficiency: 3 },
    { name: 'Tailwind CSS', category: 'frontend', color: '#3B82F6', proficiency: 4 },
    
    // Backend
    { name: 'Node.js', category: 'backend', color: '#10B981', proficiency: 4 },
    { name: 'Python', category: 'backend', color: '#10B981', proficiency: 4 },
    { name: 'FastAPI', category: 'backend', color: '#10B981', proficiency: 3 },
    { name: 'Express.js', category: 'backend', color: '#10B981', proficiency: 4 },
    { name: 'Django', category: 'backend', color: '#10B981', proficiency: 3 },
    
    // AI/ML
    { name: 'LangChain', category: 'ai', color: '#8B5CF6', proficiency: 4 },
    { name: 'OpenAI API', category: 'ai', color: '#8B5CF6', proficiency: 4 },
    { name: 'Pinecone', category: 'ai', color: '#8B5CF6', proficiency: 3 },
    { name: 'Hugging Face', category: 'ai', color: '#8B5CF6', proficiency: 3 },
    { name: 'TensorFlow', category: 'ai', color: '#8B5CF6', proficiency: 2 },
    
    // Database & Tools
    { name: 'PostgreSQL', category: 'database', color: '#F59E0B', proficiency: 4 },
    { name: 'MongoDB', category: 'database', color: '#F59E0B', proficiency: 4 },
    { name: 'Redis', category: 'database', color: '#F59E0B', proficiency: 3 },
    { name: 'Docker', category: 'tools', color: '#F59E0B', proficiency: 3 },
    { name: 'AWS', category: 'tools', color: '#F59E0B', proficiency: 3 },
    { name: 'Git', category: 'tools', color: '#F59E0B', proficiency: 4 },
    { name: 'Vercel', category: 'tools', color: '#F59E0B', proficiency: 4 },
  ];

  ngOnInit() {}

  ngAfterViewInit() {
    this.initThreeJS();
    this.createCentralSphere();
    this.createSkillOrbs();
    this.setupInteractions();
    this.animate();
    
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private initThreeJS() {
    const canvas = this.canvasRef.nativeElement;
    const container = canvas.parentElement!;
    
    this.scene = new THREE.Scene();
    
    this.camera = new THREE.PerspectiveCamera(
      75, 
      container.clientWidth / container.clientHeight, 
      0.1, 
      1000
    );
    this.camera.position.set(0, 0, 8);
    
    this.renderer = new THREE.WebGLRenderer({ 
      canvas: canvas, 
      alpha: true,
      antialias: true 
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  private createCentralSphere() {
    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: 0x1a1a2e,
      transparent: true,
      opacity: 0.3,
      wireframe: true
    });
    
    this.centralSphere = new THREE.Mesh(geometry, material);
    this.scene.add(this.centralSphere);
    
    // Add core glow effect
    const glowGeometry = new THREE.SphereGeometry(1.6, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.1
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    this.scene.add(glow);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    this.scene.add(pointLight);
  }

  private createSkillOrbs() {
    this.skills.forEach((skill, index) => {
      // Create skill orb
      const geometry = new THREE.SphereGeometry(0.1 + (skill.proficiency * 0.05), 16, 16);
      const material = new THREE.MeshPhongMaterial({
        color: skill.color,
        transparent: true,
        opacity: 0.8
      });
      
      const skillMesh = new THREE.Mesh(geometry, material);
      
      // Position skills in orbital patterns
      const radius = 3 + Math.random() * 2;
      const theta = (index / this.skills.length) * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      skillMesh.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
      
      // Store skill data for interaction
      (skillMesh as any).skillData = skill;
      (skillMesh as any).originalPosition = skillMesh.position.clone();
      (skillMesh as any).orbitSpeed = 0.002 + Math.random() * 0.003;
      (skillMesh as any).orbitRadius = radius;
      
      this.skillMeshes.push(skillMesh);
      this.scene.add(skillMesh);
      
      // Create skill label
      this.createSkillLabel(skill, skillMesh);
    });
  }

  private createSkillLabel(skill: Skill, mesh: THREE.Mesh) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = 128;
    canvas.height = 32;
    
    context.fillStyle = skill.color;
    context.font = '12px Arial';
    context.textAlign = 'center';
    context.fillText(skill.name, 64, 20);
    
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.8 });
    const sprite = new THREE.Sprite(spriteMaterial);
    
    sprite.scale.set(1, 0.25, 1);
    sprite.position.copy(mesh.position);
    sprite.position.y += 0.3;
    
    this.scene.add(sprite);
    (mesh as any).label = sprite;
  }

  private setupInteractions() {
    const canvas = this.canvasRef.nativeElement;
    
    canvas.addEventListener('mousemove', (event) => {
      const rect = canvas.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Raycasting for hover effects
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.skillMeshes);
      
      // Reset all skills
      this.skillMeshes.forEach(mesh => {
        mesh.scale.setScalar(1);
        (mesh.material as THREE.MeshPhongMaterial).opacity = 0.8;
      });
      
      // Highlight hovered skill
      if (intersects.length > 0) {
        const hoveredMesh = intersects[0].object as THREE.Mesh;
        hoveredMesh.scale.setScalar(1.5);
        (hoveredMesh.material as THREE.MeshPhongMaterial).opacity = 1;
        
        // Show tooltip
        const skillData = (hoveredMesh as any).skillData;
        this.showTooltip(skillData, event.clientX, event.clientY);
      } else {
        this.hideTooltip();
      }
    });
    
    canvas.addEventListener('mouseleave', () => {
      this.hideTooltip();
    });
  }

  private showTooltip(skill: Skill, x: number, y: number) {
    const tooltip = document.getElementById('skillTooltip')!;
    tooltip.innerHTML = `
      <strong>${skill.name}</strong><br>
      Category: ${skill.category}<br>
      Proficiency: ${'★'.repeat(skill.proficiency)}${'☆'.repeat(5 - skill.proficiency)}
    `;
    tooltip.style.left = `${x + 10}px`;
    tooltip.style.top = `${y - 10}px`;
    tooltip.style.opacity = '1';
  }

  private hideTooltip() {
    const tooltip = document.getElementById('skillTooltip')!;
    tooltip.style.opacity = '0';
  }

  private animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    
    // Rotate central sphere
    if (this.centralSphere) {
      this.centralSphere.rotation.y += 0.01;
    }
    
    // Animate skill orbs in orbital motion
    this.skillMeshes.forEach((mesh, index) => {
      const data = (mesh as any);
      const time = Date.now() * data.orbitSpeed;
      
      // Orbital motion
      const radius = data.orbitRadius;
      const x = radius * Math.cos(time + index);
      const z = radius * Math.sin(time + index);
      const y = Math.sin(time * 2 + index) * 0.5;
      
      mesh.position.set(x, y, z);
      
      // Update label position
      if (data.label) {
        data.label.position.copy(mesh.position);
        data.label.position.y += 0.3;
      }
      
      // Gentle rotation
      mesh.rotation.x += 0.02;
      mesh.rotation.y += 0.01;
    });
    
    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize() {
    const container = this.canvasRef.nativeElement.parentElement!;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}