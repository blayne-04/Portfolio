/* filepath: c:\Users\beful\Projects\Portfolio\src\scripts\roadmap.js */
const roadmap = [
  { 
    id: "proj1", 
    label: "Project 1",
    timeline: "Q1 2024 - Q2 2024",
    progress: 3,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 7l6-3l6 3l6-3v13l-6 3l-6-3l-6 3zm6 5v.01M6 13v.01M17 15l-4-4m0 4l4-4"/></svg>`
  },
  { 
    id: "proj2", 
    label: "Project 2",
    timeline: "Q2 2024 - Q3 2024",
    progress: 2,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 7l6-3l6 3l6-3v13l-6 3l-6-3l-6 3zm6 5v.01M6 13v.01M17 15l-4-4m0 4l4-4"/></svg>`
  },
  { 
    id: "proj3", 
    label: "Project 3",
    timeline: "Q3 2024 - Q4 2024",
    progress: 1,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 7l6-3l6 3l6-3v13l-6 3l-6-3l-6 3zm6 5v.01M6 13v.01M17 15l-4-4m0 4l4-4"/></svg>`
  },
  { 
    id: "proj4", 
    label: "Project 4",
    timeline: "Q4 2024 - Q1 2025",
    progress: 0,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 7l6-3l6 3l6-3v13l-6 3l-6-3l-6 3zm6 5v.01M6 13v.01M17 15l-4-4m0 4l4-4"/></svg>`
  },
  { 
    id: "proj5", 
    label: "Project 5",
    timeline: "Q1 2025 - Q2 2025",
    progress: 0,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 7l6-3l6 3l6-3v13l-6 3l-6-3l-6 3zm6 5v.01M6 13v.01M17 15l-4-4m0 4l4-4"/></svg>`
  }
];

// Double-width progress icons (64x32 instead of 32x32)
const progressIcons = {
  0: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="32" viewBox="0 0 64 32"><path fill="currentColor" d="M56 21H8a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h48a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M8 13v6h48v-6Z"/></svg>`,
  1: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="32" viewBox="0 0 64 32"><path fill="currentColor" d="M56 21H8a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h48a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M8 13v6h48v-6Z"/><path fill="currentColor" d="M10 15h12v2H10z"/></svg>`,
  2: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="32" viewBox="0 0 64 32"><path fill="currentColor" d="M56 21H8a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h48a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M8 13v6h48v-6Z"/><path fill="currentColor" d="M10 15h24v2H10z"/></svg>`,
  3: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="32" viewBox="0 0 64 32"><path fill="currentColor" d="M56 21H8a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h48a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M8 13v6h48v-6Z"/><path fill="currentColor" d="M10 15h40v2H10z"/></svg>`
};

export function initRoadmap() {
  const container = document.getElementById('roadmap-container');
  if (!container) return;

  container.innerHTML = '';

  // Create modal
  createModal();

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('roadmap-connections');
  container.appendChild(svg);

  const nodePositions = [];
  const containerWidth = container.offsetWidth || 400;
  const nodeWidth = 140;
  const nodeHeight = 120;
  
  roadmap.forEach((item, index) => {
    const node = createNode(item, index);
    container.appendChild(node);
    
    // Better positioning with more vertical spacing
    const isEven = index % 2 === 0;
    const x = isEven ? 
      containerWidth * 0.25 - nodeWidth / 2 : 
      containerWidth * 0.75 - nodeWidth / 2;
    const y = 80 + index * 168; // 20% more vertical distance
    
    node.style.transform = `translate(${x}px, ${y}px)`;
``    
    // Store positions for connector drawing (top-left corner positions as before)
    nodePositions.push({ x, y, width: nodeWidth, height: nodeHeight });
  });

  setTimeout(() => drawConnectors(svg, nodePositions), 100);
}

function createNode(item, index) {
  const node = document.createElement('div');
  node.classList.add('roadmap-node');
  node.setAttribute('data-id', item.id);
  
  // Add SVG icon
  const iconContainer = document.createElement('div');
  iconContainer.innerHTML = item.svg;
  node.appendChild(iconContainer);
  
  // Add label
  const label = document.createElement('span');
  label.textContent = item.label;
  node.appendChild(label);
  
  node.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelectorAll('.roadmap-node').forEach(n => n.classList.remove('active'));
    node.classList.add('active');
    showModal(item);
  });
  
  return node;
}

function drawConnectors(svg, positions) {
  for (let i = 0; i < positions.length - 1; i++) {
    const start = positions[i];
    const end = positions[i + 1];
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // Calculate center points from top-left positions
    const startX = start.x + start.width / 2;
    const startY = start.y + start.height;
    const endX = end.x + end.width / 2;
    const endY = end.y;
    
    const midY = (startY + endY) / 2;
    
    const d = `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
    
    path.setAttribute('d', d);
    path.classList.add('roadmap-connector');
    svg.appendChild(path);
  }
}

function createModal() {
  const modal = document.createElement('div');
  modal.classList.add('roadmap-modal');
  modal.id = 'roadmap-modal';
  
  modal.innerHTML = `
    <div class="roadmap-modal-content">
      <button class="modal-close" onclick="closeModal()">&times;</button>
      <div class="modal-header">
        <div id="modal-icon"></div>
        <h3 id="modal-title"></h3>
      </div>
      <div class="modal-info">
        <div class="modal-row">
          <label>Timeline:</label>
          <span id="modal-timeline"></span>
        </div>
        <div class="modal-row">
          <label>Progress:</label>
          <div class="modal-progress-container">
            <div class="modal-progress-bar" id="modal-progress"></div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Close modal with escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

function showModal(item) {
  const modal = document.getElementById('roadmap-modal');
  const modalIcon = document.getElementById('modal-icon');
  const modalTitle = document.getElementById('modal-title');
  const modalTimeline = document.getElementById('modal-timeline');
  const modalProgress = document.getElementById('modal-progress');
  
  modalIcon.innerHTML = item.svg;
  modalTitle.textContent = item.label;
  modalTimeline.textContent = item.timeline;
  modalProgress.innerHTML = progressIcons[item.progress];
  
  modal.classList.add('active');
}

window.closeModal = function() {
  const modal = document.getElementById('roadmap-modal');
  modal.classList.remove('active');
  // Remove active class from nodes
  document.querySelectorAll('.roadmap-node').forEach(n => n.classList.remove('active'));
};