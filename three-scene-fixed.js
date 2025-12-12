// Three.js 3D Background Scene - Fixed Version
let scene, camera, renderer, cube, particles = [], lines = [], shapes = [];
let mouse = { x: 0, y: 0 };
let isMobile = window.innerWidth < 768;

function init() {
    console.log('Starting Three.js initialization...');
    
    // Check if THREE is available
    if (typeof THREE === 'undefined') {
        console.error('THREE.js not loaded!');
        return;
    }
    
    try {
        // Scene setup
        scene = new THREE.Scene();
        
        // Camera setup
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 8;
        
        // Get canvas element
        const canvas = document.getElementById('three-canvas');
        if (!canvas) {
            console.error('Canvas element not found!');
            return;
        }
        
        // Renderer setup
        renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            alpha: true,
            antialias: true
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        
        // Create main cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshBasicMaterial({
            color: 0x6366f1,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        
        cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        
        // Create particles
        const particleCount = isMobile ? 30 : 60;
        for (let i = 0; i < particleCount; i++) {
            const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
            const particleMaterial = new THREE.MeshBasicMaterial({
                color: 0xfcb900,
                transparent: true,
                opacity: 0.4
            });
            
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            particle.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );
            
            particles.push(particle);
            scene.add(particle);
        }
        
        // Create shapes
        const shapeCount = isMobile ? 5 : 10;
        for (let i = 0; i < shapeCount; i++) {
            const shapeType = Math.floor(Math.random() * 3);
            let geometry;
            
            if (shapeType === 0) {
                geometry = new THREE.TetrahedronGeometry(0.5);
            } else if (shapeType === 1) {
                geometry = new THREE.OctahedronGeometry(0.4);
            } else {
                geometry = new THREE.IcosahedronGeometry(0.3);
            }
            
            const material = new THREE.MeshBasicMaterial({
                color: Math.random() > 0.5 ? 0x6366f1 : 0xff6b35,
                wireframe: true,
                transparent: true,
                opacity: 0.3
            });
            
            const shape = new THREE.Mesh(geometry, material);
            shape.position.set(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15
            );
            
            shapes.push(shape);
            scene.add(shape);
        }
        
        // Create lines
        const lineCount = isMobile ? 8 : 15;
        for (let i = 0; i < lineCount; i++) {
            const points = [];
            points.push(new THREE.Vector3(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15
            ));
            points.push(new THREE.Vector3(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15
            ));
            
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0x6366f1,
                transparent: true,
                opacity: 0.2
            });
            
            const line = new THREE.Line(lineGeometry, lineMaterial);
            lines.push(line);
            scene.add(line);
        }
        
        console.log('Three.js scene created successfully');
        animate();
        
    } catch (error) {
        console.error('Error creating Three.js scene:', error);
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    // Camera movement
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 2 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    // Rotate cube
    cube.rotation.x += 0.005 + mouse.y * 0.01;
    cube.rotation.y += 0.01 + mouse.x * 0.01;
    
    // Animate particles
    particles.forEach((particle, i) => {
        particle.rotation.x += 0.01;
        particle.rotation.y += 0.01;
        particle.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01;
    });
    
    // Animate shapes
    shapes.forEach((shape, i) => {
        shape.rotation.x += 0.008;
        shape.rotation.y += 0.012;
        shape.rotation.z += 0.005;
    });
    
    // Animate lines
    lines.forEach((line, i) => {
        line.rotation.z += 0.003;
    });
    
    renderer.render(scene, camera);
}

// Mouse tracking
document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Touch tracking for mobile
document.addEventListener('touchmove', (event) => {
    if (event.touches.length === 1) {
        const touch = event.touches[0];
        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    }
}, { passive: true });

// Resize handler
window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        isMobile = window.innerWidth < 768;
    }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}