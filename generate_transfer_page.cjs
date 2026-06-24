const fs = require('fs');
const path = require('path');

const basePath = 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\scratch\\spit-roast-landing-pages';

const files = {
  beaches_html: path.join(basePath, 'spit-roast-catering-northern-beaches', 'spit-roast-catering-northern-beaches.html'),
  beaches_css: path.join(basePath, 'spit-roast-catering-northern-beaches', 'spit-roast-catering-northern-beaches.css'),
  beaches_desktop: path.join(basePath, 'spit-roast-catering-northern-beaches', 'spit-roast-catering-northern-beaches-desktop-tablet.css'),
  beaches_mobile: path.join(basePath, 'spit-roast-catering-northern-beaches', 'spit-roast-catering-northern-beaches-mobile.css'),
  beaches_head: path.join(basePath, 'spit-roast-catering-northern-beaches', 'spit-roast-catering-northern-beaches-head-section.html'),
  
  parramatta_html: path.join(basePath, 'spit-roast-catering-parramatta', 'spit-roast-catering-parramatta.html'),
  parramatta_css: path.join(basePath, 'spit-roast-catering-parramatta', 'spit-roast-catering-parramatta.css'),
  parramatta_desktop: path.join(basePath, 'spit-roast-catering-parramatta', 'spit-roast-catering-parramatta-desktop-tablet.css'),
  parramatta_mobile: path.join(basePath, 'spit-roast-catering-parramatta', 'spit-roast-catering-parramatta-mobile.css'),
  parramatta_head: path.join(basePath, 'spit-roast-catering-parramatta', 'spit-roast-catering-parramatta-head-section.html'),
  
  waverley_html: path.join(basePath, 'spit-roast-catering-waverley', 'spit-roast-catering-waverley.html'),
  waverley_css: path.join(basePath, 'spit-roast-catering-waverley', 'spit-roast-catering-waverley.css'),
  waverley_desktop: path.join(basePath, 'spit-roast-catering-waverley', 'spit-roast-catering-waverley-desktop-tablet.css'),
  waverley_mobile: path.join(basePath, 'spit-roast-catering-waverley', 'spit-roast-catering-waverley-mobile.css'),
  waverley_head: path.join(basePath, 'spit-roast-catering-waverley', 'spit-roast-catering-waverley-head-section.html'),

  canterbury_html: path.join(basePath, 'spit-roast-catering-canterbury', 'spit-roast-catering-canterbury.html'),
  canterbury_css: path.join(basePath, 'spit-roast-catering-canterbury', 'spit-roast-catering-canterbury.css'),
  canterbury_desktop: path.join(basePath, 'spit-roast-catering-canterbury', 'spit-roast-catering-canterbury-desktop-tablet.css'),
  canterbury_mobile: path.join(basePath, 'spit-roast-catering-canterbury', 'spit-roast-catering-canterbury-mobile.css'),
  canterbury_head: path.join(basePath, 'spit-roast-catering-canterbury', 'spit-roast-catering-canterbury-head-section.html'),

  annandale_html: path.join(basePath, 'spit-roast-catering-annandale', 'spit-roast-catering-annandale.html'),
  annandale_css: path.join(basePath, 'spit-roast-catering-annandale', 'spit-roast-catering-annandale.css'),
  annandale_desktop: path.join(basePath, 'spit-roast-catering-annandale', 'spit-roast-catering-annandale-desktop-tablet.css'),
  annandale_mobile: path.join(basePath, 'spit-roast-catering-annandale', 'spit-roast-catering-annandale-mobile.css'),
  annandale_head: path.join(basePath, 'spit-roast-catering-annandale', 'spit-roast-catering-annandale-head-section.html'),

  bondi_junction_html: path.join(basePath, 'spit-roast-catering-bondi-junction', 'spit-roast-catering-bondi-junction.html'),
  bondi_junction_css: path.join(basePath, 'spit-roast-catering-bondi-junction', 'spit-roast-catering-bondi-junction.css'),
  bondi_junction_desktop: path.join(basePath, 'spit-roast-catering-bondi-junction', 'spit-roast-catering-bondi-junction-desktop-tablet.css'),
  bondi_junction_mobile: path.join(basePath, 'spit-roast-catering-bondi-junction', 'spit-roast-catering-bondi-junction-mobile.css'),
  bondi_junction_head: path.join(basePath, 'spit-roast-catering-bondi-junction', 'spit-roast-catering-bondi-junction-head-section.html'),

  coogee_html: path.join(basePath, 'spit-roast-catering-coogee', 'spit-roast-catering-coogee.html'),
  coogee_css: path.join(basePath, 'spit-roast-catering-coogee', 'spit-roast-catering-coogee.css'),
  coogee_desktop: path.join(basePath, 'spit-roast-catering-coogee', 'spit-roast-catering-coogee-desktop-tablet.css'),
  coogee_mobile: path.join(basePath, 'spit-roast-catering-coogee', 'spit-roast-catering-coogee-mobile.css'),
  coogee_head: path.join(basePath, 'spit-roast-catering-coogee', 'spit-roast-catering-coogee-head-section.html'),

  kensington_html: path.join(basePath, 'spit-roast-catering-kensington', 'spit-roast-catering-kensington.html'),
  kensington_css: path.join(basePath, 'spit-roast-catering-kensington', 'spit-roast-catering-kensington.css'),
  kensington_desktop: path.join(basePath, 'spit-roast-catering-kensington', 'spit-roast-catering-kensington-desktop-tablet.css'),
  kensington_mobile: path.join(basePath, 'spit-roast-catering-kensington', 'spit-roast-catering-kensington-mobile.css'),
  kensington_head: path.join(basePath, 'spit-roast-catering-kensington', 'spit-roast-catering-kensington-head-section.html'),

  campsie_html: path.join(basePath, 'spit-roast-catering-campsie', 'spit-roast-catering-campsie.html'),
  campsie_css: path.join(basePath, 'spit-roast-catering-campsie', 'spit-roast-catering-campsie.css'),
  campsie_desktop: path.join(basePath, 'spit-roast-catering-campsie', 'spit-roast-catering-campsie-desktop-tablet.css'),
  campsie_mobile: path.join(basePath, 'spit-roast-catering-campsie', 'spit-roast-catering-campsie-mobile.css'),
  campsie_head: path.join(basePath, 'spit-roast-catering-campsie', 'spit-roast-catering-campsie-head-section.html'),

  camperdown_html: path.join(basePath, 'spit-roast-catering-camperdown', 'spit-roast-catering-camperdown.html'),
  camperdown_css: path.join(basePath, 'spit-roast-catering-camperdown', 'spit-roast-catering-camperdown.css'),
  camperdown_desktop: path.join(basePath, 'spit-roast-catering-camperdown', 'spit-roast-catering-camperdown-desktop-tablet.css'),
  camperdown_mobile: path.join(basePath, 'spit-roast-catering-camperdown', 'spit-roast-catering-camperdown-mobile.css'),
  camperdown_head: path.join(basePath, 'spit-roast-catering-camperdown', 'spit-roast-catering-camperdown-head-section.html'),

  cremorne_html: path.join(basePath, 'spit-roast-catering-cremorne', 'catering-cremorne.html'),
  cremorne_css: path.join(basePath, 'spit-roast-catering-cremorne', 'catering-cremorne.css'),
  cremorne_desktop: path.join(basePath, 'spit-roast-catering-cremorne', 'catering-cremorne-desktop-tablet.css'),
  cremorne_mobile: path.join(basePath, 'spit-roast-catering-cremorne', 'catering-cremorne-mobile.css'),
  cremorne_head: path.join(basePath, 'spit-roast-catering-cremorne', 'catering-cremorne-head-section.html'),

  crows_nest_html: path.join(basePath, 'spit-roast-catering-crows-nest', 'catering-crows-nest.html'),
  crows_nest_css: path.join(basePath, 'spit-roast-catering-crows-nest', 'catering-crows-nest.css'),
  crows_nest_desktop: path.join(basePath, 'spit-roast-catering-crows-nest', 'catering-crows-nest-desktop-tablet.css'),
  crows_nest_mobile: path.join(basePath, 'spit-roast-catering-crows-nest', 'catering-crows-nest-mobile.css'),
  crows_nest_head: path.join(basePath, 'spit-roast-catering-crows-nest', 'catering-crows-nest-head-section.html'),

  double_bay_html: path.join(basePath, 'spit-roast-catering-double-bay', 'catering-double-bay.html'),
  double_bay_css: path.join(basePath, 'spit-roast-catering-double-bay', 'catering-double-bay.css'),
  double_bay_desktop: path.join(basePath, 'spit-roast-catering-double-bay', 'catering-double-bay-desktop-tablet.css'),
  double_bay_mobile: path.join(basePath, 'spit-roast-catering-double-bay', 'catering-double-bay-mobile.css'),
  double_bay_head: path.join(basePath, 'spit-roast-catering-double-bay', 'catering-double-bay-head-section.html'),

  neutral_bay_html: path.join(basePath, 'spit-roast-catering-neutral-bay', 'catering-neutral-bay.html'),
  neutral_bay_css: path.join(basePath, 'spit-roast-catering-neutral-bay', 'catering-neutral-bay.css'),
  neutral_bay_desktop: path.join(basePath, 'spit-roast-catering-neutral-bay', 'catering-neutral-bay-desktop-tablet.css'),
  neutral_bay_mobile: path.join(basePath, 'spit-roast-catering-neutral-bay', 'catering-neutral-bay-mobile.css'),
  neutral_bay_head: path.join(basePath, 'spit-roast-catering-neutral-bay', 'catering-neutral-bay-head-section.html')
};

let htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Code Transfer Helper</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f0f0f0; }
    h1 { color: #333; }
    .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .btn { background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-size: 16px; margin-right: 10px; margin-bottom: 10px; }
    .btn:hover { background: #0056b3; }
    .success-msg { color: green; font-weight: bold; margin-left: 10px; display: none; }
  </style>
  <script>
    function copyText(id) {
      const el = document.getElementById(id);
      navigator.clipboard.writeText(el.value).then(() => {
        const msg = document.getElementById(id + '_msg');
        msg.style.display = 'inline';
        setTimeout(() => { msg.style.display = 'none'; }, 2000);
      });
    }
  </script>
</head>
<body>
  <h1>Code Transfer Helper</h1>
`;

for (const [key, filePath] of Object.entries(files)) {
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    // Escape special HTML characters
    const escapedContent = fileContent
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
      
    htmlContent += `
  <div class="section">
    <h2>${key.replace('_', ' ').toUpperCase()}</h2>
    <button class="btn" onclick="copyText('${key}')">Copy to Clipboard</button>
    <span id="${key}_msg" class="success-msg">Copied!</span>
    <textarea id="${key}" style="display:none;">${escapedContent}</textarea>
  </div>
`;
  } else {
    console.log(`File not found: ${filePath}`);
  }
}

htmlContent += `
</body>
</html>
`;

fs.writeFileSync(path.join(basePath, 'code_transfer.html'), htmlContent);
console.log('code_transfer.html generated successfully!');
