// All site content lives here. Edit this file to update the website —
// the components only decide how things look.

export const profile = {
  firstName: 'Muhammad Haekal',
  lastName: 'Khowarizmi',
  initials: 'MHK',
  roles: [
    'PhD candidate · Université Bourgogne Europe × Universitas Gunadarma',
    'Lecturer · Universitas Gunadarma, Jakarta',
  ],
  lede: 'I teach models to read kidney biopsies, then check whether they still hold up once the benchmark is over and the clinical question begins.',
  motto: 'Labor omnia vincit.',
  location: 'Jakarta / Dijon',
}

export const links = [
  { label: 'Email', text: 'mhaekalkh@staff.gunadarma.ac.id', href: 'mailto:mhaekalkh@staff.gunadarma.ac.id' },
  { label: 'GitHub', text: 'haekalkh ↗', href: 'https://github.com/haekalkh' },
  // Add more when ready, for example:
  // { label: 'LinkedIn', text: 'in/your-handle ↗', href: 'https://www.linkedin.com/in/your-handle' },
  // { label: 'Scholar', text: 'Google Scholar ↗', href: 'https://scholar.google.com/citations?user=XXXX' },
  // { label: 'ORCID', text: '0000-0000-0000-0000 ↗', href: 'https://orcid.org/0000-0000-0000-0000' },
]

export const stats = [
  { n: '17,109', d: 'hand-drawn structure annotations across 292 biopsy regions' },
  { n: '10', d: 'renal structure classes segmented per image, from tubules to arterial laminae' },
  { n: '−46', unit: '%', d: 'inference time per tile after a mixed-precision fix, same predictions' },
  { n: '153', d: 'patients, split at patient level so no one appears in both train and test' },
]

export const about = {
  title: 'Data makes hidden problems visible and measurable.',
  paragraphs: [
    'That is what drew me to computer vision. A pathologist grading a biopsy counts and judges structures by eye, and two experts can disagree. A segmentation model turns the same slide into numbers that can be checked, compared and repeated.',
    'My work sits between deep learning and nephropathology. I build instance-segmentation pipelines for kidney tissue, and I pay close attention to how they are evaluated, because a model that wins on a benchmark can still miss the thing a clinician needs to know.',
    'Long term, I want to do research with real impact on healthcare and education in Indonesia, and to build the kind of lab where students learn to question a result before they celebrate it.',
  ],
}

export const research = [
  {
    title: 'Transformer-based instance segmentation for kidney biopsy analysis',
    when: '2026 · M.Sc. thesis',
    where: 'LEAD Laboratory (CNRS UMR 5022) · Université Bourgogne Europe · CHU Dijon Bourgogne',
    text: 'I migrated the SKINET kidney-biopsy pipeline from Mask R-CNN to Mask2Former and rebuilt it from scratch as a traceable, nine-stage pipeline: data audit, patient-level split, cortex-aware tiling, training, stitching, post-processing and clinical readout. The question was simple: does a better benchmark score give a better clinical answer?',
    findings: [
      'On tile-level AP, Mask2Former beats Mask R-CNN by a clear margin across three seeds. At the slide level, where the clinical decision is made, the gap is no longer statistically established.',
      'The system understates tubular atrophy, the direction that hides disease. One inherited post-processing rule explains much of it, and it can be changed without retraining.',
      'I found and corrected patient-level leakage in the original data split.',
    ],
    status: { text: 'Completed · defended Sep 2026', done: true },
    tags: ['Mask2Former', 'Swin-B', 'Detectron2', 'WSI tiling', 'patient bootstrap', 'HPC / SGE'],
    link: { text: 'Pipeline and released models on GitHub ↗', href: 'https://github.com/haekalkh/skinet' },
  },
  {
    title: 'Edge AI for renal biopsy morphometry',
    when: '2026 – · PhD',
    where: 'Cotutelle · Université Bourgogne Europe (ED SPIM) × Universitas Gunadarma',
    text: 'A segmentation model that needs a data-centre GPU will not reach most hospitals in Indonesia. My doctoral work compresses biopsy segmentation and morphometry so it can run on embedded hardware next to the microscope, on Jetson-class devices and FPGAs, while keeping the clinical readout intact.',
    status: { text: 'In progress' },
    tags: ['model compression', 'NVIDIA Jetson', 'FPGA', 'FP16 / quantization'],
  },
  {
    title: 'Immune-cell quantification in immunohistochemistry',
    when: '2026 – · collaboration',
    where: 'With the nephropathology team at CHU Dijon Bourgogne',
    text: 'A new cohort of IHC-stained kidney biopsies, where the task shifts from outlining structures to counting marked cells and locating them by compartment: interstitium, glomeruli, tubules and vessel walls. Dense small objects, very different from trichrome.',
    status: { text: 'In progress' },
    tags: ['IHC / DAB', 'cell counting', 'dataset audit'],
  },
]

export const projects = [
  {
    kind: 'Health AI · Computer vision',
    title: 'MealMind',
    text: 'Food recognition for Indonesian meals with YOLOv8/YOLOv11, tied to BMI and TDEE for adaptive nutrition recommendations, deployed to mobile.',
    tags: ['YOLO', 'mobile'],
  },
  {
    kind: 'Digital twin · Web 3D',
    title: 'Building digital twin',
    text: 'A 3D twin of a circular multi-storey building: floor-by-floor split view, live sensor status, and scenes that follow the real time of day and weather. Merged into the UGTD digital-twin platform.',
    tags: ['Three.js', 'TypeScript', 'Vite'],
  },
  {
    kind: 'Smart farming',
    title: 'Smart Greenhouse START',
    text: "A solar-powered greenhouse at Gunadarma's Cianjur site with a digital twin, computer-vision fruit sorting and AI-planned watering, developed with local farmer groups.",
    tags: ['IoT', 'computer vision', 'digital twin'],
  },
  {
    kind: 'IoT',
    title: 'Smart Poultry',
    text: 'An IoT system for monitoring and automating a poultry house, first built in 2023 and now being written up as a journal paper.',
    tags: ['ESP32', 'sensors'],
  },
  {
    kind: 'Medical imaging',
    title: 'Polyp segmentation',
    text: 'A CNN–Transformer hybrid for colonoscopy polyp segmentation, cross-validated over Kvasir-SEG, CVC-ClinicDB and Kvasir-Sessile.',
    tags: ['PyTorch', 'hybrid encoder'],
  },
  {
    kind: 'Robotics',
    title: 'Pan-tilt camera robot',
    text: 'A 2-DOF camera head on MG90S servos, designed in Fusion 360 with an ESP32 housed in the base. A small rig for tracking and teaching.',
    tags: ['Fusion 360', 'ESP32'],
  },
]

export const path = [
  { y: '2026 –', t: 'PhD, cotutelle', s: 'Université Bourgogne Europe (ED SPIM) × Universitas Gunadarma' },
  { y: '2026 –', t: 'Lecturer', s: 'Universitas Gunadarma · teaching includes Advanced Robotics' },
  { y: '2024 –', t: 'Technology Development staff', s: 'Universitas Gunadarma (UG Technology Development)' },
  { y: 'Mar–Aug 2026', t: 'Research intern, SKINET', s: 'LEAD Laboratory, CNRS UMR 5022 · CHU Dijon Bourgogne' },
  { y: '2025 – 2026', t: 'M.Sc., Health AI track', s: 'Université Bourgogne Europe, Dijon · double degree' },
  { y: '2024 – 2026', t: 'M.M.S.I., Information Systems Management (Health AI)', s: 'Universitas Gunadarma · double degree' },
  { y: '2020 – 2024', t: 'S.Kom., Computer Science', s: 'Universitas Gunadarma' },
]
