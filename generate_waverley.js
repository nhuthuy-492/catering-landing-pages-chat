const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\LENOVO\\Downloads\\snapps_source_code\\Catering North Sydney';
const destDir = 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\scratch\\spit-roast-landing-pages\\spit-roast-catering-waverley';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// 1. Generate spit-roast-catering-waverley-head-section.html
const headContent = `  <title>
    Catering Services in Waverley | Cater King
  </title>
  <meta name="description" content="Professional catering in Waverley for corporate events, birthdays, weddings and private functions. Fresh menus, setup and service included."/>
`;
fs.writeFileSync(path.join(destDir, 'spit-roast-catering-waverley-head-section.html'), headContent, 'utf8');
console.log('Created head-section file.');

// 2. Generate CSS files
const cssFiles = [
  { src: 'Catering North Sydney.css', dest: 'spit-roast-catering-waverley.css' },
  { src: 'Catering North Sydney-desktop-tablet.css', dest: 'spit-roast-catering-waverley-desktop-tablet.css' },
  { src: 'Catering North Sydney-mobile.css', dest: 'spit-roast-catering-waverley-mobile.css' }
];

cssFiles.forEach(f => {
  let content = fs.readFileSync(path.join(srcDir, f.src), 'utf8');
  // Replace northsydneyservice with waverleyservice
  content = content.replace(/northsydneyservice/g, 'waverleyservice');
  content = content.replace(/north-sydney/g, 'waverley');
  fs.writeFileSync(path.join(destDir, f.dest), content, 'utf8');
  console.log(`Created ${f.dest}`);
});

// 3. Process HTML file
let html = fs.readFileSync(path.join(srcDir, 'Catering North Sydney.html'), 'utf8');

// Replace contact section class/id
html = html.replace(/u_northsydneyservice/g, 'u_waverleyservice');
html = html.replace(/id="northsydneyservice"/g, 'id="waverleyservice"');
html = html.replace(/data-anchor="north sydney service"/g, 'data-anchor="waverley service"');

// Replace North Sydney with Waverley throughout
// We will do specific case-sensitive replacements first
html = html.replace(/Catering North Sydney/g, 'Catering Waverley');
html = html.replace(/Catering Services in North Sydney/g, 'Catering Services in Waverley');
html = html.replace(/Catering Service in North Sydney/g, 'Catering Service in Waverley');
html = html.replace(/catering in North Sydney/g, 'catering in Waverley');
html = html.replace(/North Sydney Catering/g, 'Waverley Catering');
html = html.replace(/North Sydney catering/g, 'Waverley catering');
html = html.replace(/catering North Sydney/g, 'catering Waverley');
html = html.replace(/North Sydney CBD/g, 'Bondi & Bondi Beach');
html = html.replace(/North Sydney's/g, 'Waverley\'s');
html = html.replace(/North Sydney/g, 'Waverley');
html = html.replace(/north sydney/g, 'waverley');

// Replace contact link URL
html = html.replace(/\/catering-north-sydney#northsydneyservice/g, '/catering-waverley#waverleyservice');

// Replace CaterKing with Cater King
html = html.replace(/CaterKing/g, 'Cater King');

// Let's replace the 6 service paragraphs
// Let's first replace the headers
html = html.replace(/<h4>\s*Birthday Catering\s*<\/h4>/g, '<h4>Birthday Catering Waverley</h4>');
html = html.replace(/<h4>\s*Spit Roast\s*<\/h4>/g, '<h4>Spit Roast Catering Waverley</h4>');
html = html.replace(/<h4>\s*Corporate Events and Functions\s*<\/h4>/g, '<h4>Corporate Events and Functions Waverley</h4>');
html = html.replace(/<h4>\s*BBQ Catering\s*<\/h4>/g, '<h4>BBQ Catering Waverley</h4>');
html = html.replace(/<h4>\s*Finger Food\s*<\/h4>/g, '<h4>Finger Food Waverley</h4>');
html = html.replace(/<h4>\s*Wedding Catering\s*<\/h4>/g, '<h4>Wedding Catering Waverley</h4>');

// Let's replace the paragraphs of the services
// To be very precise, we replace the specific paragraphs that go under the service headers
const birthdayOld = "Caterking offers birthday catering services for children, adults, and milestone celebrations. Menus and service styles are tailored to the event, with options including finger food, buffet catering, and grazing tables. Catering is available for private homes, venues, and outdoor events, with setup and service support included.";
const birthdayNew = "Cater King offers birthday catering services for children, adults, and milestone celebrations across Waverley. Menus and service styles are tailored to the event, with options including finger food, buffet catering, BBQ, and spit roast. Catering is available for private homes, venues, and outdoor events, with setup and pack-down included so hosts can enjoy the celebration without managing the food.";
html = html.replace(birthdayOld, birthdayNew);

const spitOld = "CaterKing provides spit roast catering services featuring slow-roasted meats cooked and carved on-site. This service delivers a complete meal served with bread rolls, sides, and sauces, making it ideal for private gatherings, events, and outdoor functions. Spit roast catering includes equipment, service support, and clean-up for a smooth experience.";
const spitNew = "Cater King provides spit roast catering services in Waverley featuring slow-roasted meats cooked and carved on-site. This service delivers a complete meal served with rolls, sides, and sauces, making it ideal for private gatherings, large events, and outdoor functions. Spit roast catering includes equipment, service support, and pack-down for a smooth on-site experience.";
html = html.replace(spitOld, spitNew);

const corpOld = "CaterKing provides corporate events and function catering designed for professional settings where timing, presentation, and reliability are essential. This service caters for meetings, training sessions, conferences, and company events, with menu formats tailored to the event schedule and guest numbers.";
const corpNew = "Cater King provides corporate events and function catering designed for professional settings where timing, presentation, and reliability are essential. This service caters for meetings, client functions, and company events across Waverley, with menu formats tailored to the event schedule and guest flow.";
html = html.replace(corpOld, corpNew);

const bbqOld = "CaterKing &nbsp;provides BBQ catering services focused on live grilling, fresh food, and relaxed service. BBQ menus include grilled meats, seafood, salads, and sides, served through buffet setups or managed BBQ stations. This service is ideal for outdoor events, team celebrations, and private functions.";
const bbqNew = "Cater King provides BBQ catering services focused on live grilling, fresh food, and relaxed service in Waverley. BBQ menus include grilled meats, vegetables, and sides, served through buffet setups or managed BBQ stations. This service is ideal for outdoor events, team celebrations, and private functions where freshly cooked food and easy service flow are important.";
html = html.replace(bbqOld, bbqNew);

const fingerOld = "CaterKing provides finger food catering services designed for events where guests are standing, mingling, or moving between conversations. Menus feature bite-sized, easy-to-eat items served hot or cold, ideal for corporate events, parties, and private functions.";
const fingerNew = "Cater King provides finger food catering services designed for events where guests are standing, mingling, or moving between conversations. Menus feature bite-sized, easy-to-eat items served hot or cold, ideal for corporate events, parties, weddings, and private functions across Waverley.";
html = html.replace(fingerOld, fingerNew);

const wedOld = "CaterKing &nbsp;offers wedding catering services designed to suit both intimate celebrations and larger wedding receptions. Menus are carefully planned to match the style, timing, and flow of the day, with options including canapé service, buffet catering, plated meals, and grazing tables.";
const wedNew = "Cater King offers wedding catering services designed to suit both intimate celebrations and larger wedding receptions across Waverley. Menus are carefully planned to match the style, timing, and flow of the day, with options including canapé service, buffet catering, plated meals, and shared feasting styles.";
html = html.replace(wedOld, wedNew);

// Replace "Our Caterking's Services" heading which is split across tags
const oldServicesHeading = `       <strong class="font-size-40 m-font-size-32" style="color: rgb(0, 0, 0); font-family: 'DM Serif Display'; display: initial; font-weight: bold;" no_space_b="true" no_space_e="true">
        Our
       </strong>
       <span style="display: initial;" single-space="true" no_space_b="true" no_space_e="true">
        <span style="display: initial;">
        </span>
       </span>
       <strong class="font-size-40 m-font-size-32" style="display: initial; color: rgb(43, 157, 143); font-family: 'DM Serif Display'; font-weight: bold;" no_space_b="true" no_space_e="true">
        Caterking's
       </strong>
       <span style="display: initial;" single-space="true" no_space_b="true" no_space_e="true">
        <span style="display: initial;">
        </span>
       </span>
       <strong class="font-size-40 m-font-size-32" style="display: initial; color: rgb(0, 0, 0); font-family: 'DM Serif Display'; font-weight: bold;" no_space_b="true" no_space_e="true">
        Services
       </strong>`;

const newServicesHeading = `       <strong class="font-size-40 m-font-size-32" style="color: rgb(0, 0, 0); font-family: 'DM Serif Display'; display: initial; font-weight: bold;" no_space_b="true" no_space_e="true">
        Our
       </strong>
       <span style="display: initial;" single-space="true" no_space_b="true" no_space_e="true">
        <span style="display: initial;">
        </span>
       </span>
       <strong class="font-size-40 m-font-size-32" style="display: initial; color: rgb(43, 157, 143); font-family: 'DM Serif Display'; font-weight: bold;" no_space_b="true" no_space_e="true">
        Catering
       </strong>
       <span style="display: initial;" single-space="true" no_space_b="true" no_space_e="true">
        <span style="display: initial;">
        </span>
       </span>
       <strong class="font-size-40 m-font-size-32" style="display: initial; color: rgb(0, 0, 0); font-family: 'DM Serif Display'; font-weight: bold;" no_space_b="true" no_space_e="true">
        Services in Waverley
       </strong>`;

html = html.replace(oldServicesHeading, newServicesHeading);
html = html.replace(/Caterking/g, 'Cater King');

// Replace Our Catering Services subtitle
const servicesSubOld = "Our services are structured to cover everything from preparation to on-site setup, allowing hosts in Waverley to choose the catering style that best fits their event.";
const servicesSubNew = "Our services are structured to cover everything from food preparation and service setup to pack-down, allowing hosts in Waverley to choose the catering style that best fits their event without managing logistics.";
html = html.replace(servicesSubOld, servicesSubNew);

// Replace "Why Choose Our Catering Services" paragraphs (from docx text)
const choose1Old = "We understand the fast-paced nature of Waverley events. From boardroom meetings to private celebrations, our team delivers punctual, professional catering that runs smoothly from start to finish.";
const choose1New = "We understand the fast-paced nature of events around Bondi and Waverley. From private celebrations to corporate functions, our team delivers punctual, professional catering that runs smoothly from start to finish.";
html = html.replace(choose1Old, choose1New);

const choose3Old = "Clear communication and organised logistics ensure your catering is delivered, set up, and managed with minimal stress, helping your event stay on schedule whether at a high-rise office or a private home.";
const choose3New = "Clear communication and organised logistics ensure your catering is delivered, set up, and managed with minimal stress, helping your event stay on schedule whether at a beachside venue or a private home.";
html = html.replace(choose3Old, choose3New);

const choose4Old = "We use fresh ingredients and structured preparation systems to maintain high standards in both flavour and presentation, suitable for corporate and private events across Waverley.";
const choose4New = "We use fresh ingredients and structured preparation systems to maintain high standards in both flavour and presentation, suitable for corporate and private events across Waverley and the Eastern Suburbs.";
html = html.replace(choose4Old, choose4New);

// Replace "Industries We Serve in Waverley" title
html = html.replace("Industries We Serve in Waverley", "Events and Communities We Serve in Waverley");
const indSubOld = "Waverley is a major commercial and event hub, home to a diverse range of industries that require professional, reliable catering solutions. Below is a clear overview of the key industries we serve in Waverley, highlighting how our catering services are tailored to meet the operational needs of each sector.";
const indSubNew = "Waverley is a mix of residential, beachside and small commercial communities, each with different catering needs. Below is an overview of the event types we cater for across the Waverley area.";
html = html.replace(indSubOld, indSubNew);

// Replace the data-widget-config in the Industries widget (class "u_1334132867 widget-7b2ba5")
// Let's do this by matching the exact widget span and replacing the data-widget-config attribute
const oldTabsConfig = `{"tabs":[{"image":"","itemLabel":"Corporate & Financial Services","headingType":"h4","itemTitle":"","itemDesc":"<p class=\\"rteBlock\\">North Sydney is home to major corporate offices, financial institutions, and professional service firms. We provide structured catering solutions for board meetings, executive briefings, conferences, and staff events. Our service prioritises punctual delivery, clear communication, and presentation that aligns with professional business environments.</p><br>","showBtn":false,"textOnLink":"Buy Tickets"},{"image":"","itemLabel":"Technology & Creative Agencies","headingType":"h4","itemTitle":"","itemDesc":"<p class=\\"rteBlock\\">Technology companies and creative agencies often require flexible catering for workshops, product launches, team collaborations, and networking events. We offer adaptable menu formats such as individually packaged meals, buffet spreads, and cocktail catering to suit modern office settings and fast-paced schedules.</p>","showBtn":false,"textOnLink":"Buy Tickets"},{"image":"","itemLabel":" Healthcare & Medical Centres","headingType":"h4","itemTitle":"","itemDesc":"<p class=\\"rteBlock\\">We support medical clinics, allied health providers, and healthcare organisations with dependable catering for internal meetings, training programs, and corporate functions. Our team understands the importance of timing, organisation, and menu flexibility within structured healthcare environments.</p><br>","showBtn":false,"textOnLink":"Buy Tickets"},{"image":"","itemLabel":"Education & Training Organisations","headingType":"h4","itemTitle":"","itemDesc":"<p class=\\"rteBlock\\">For seminars, workshops, and professional training sessions, we provide efficient catering designed around scheduled agendas. Options include light refreshments, lunch boxes, and buffet catering, ensuring participants are well catered for without disrupting program flow.</p><br>","showBtn":false,"textOnLink":"Buy Tickets"},{"image":"","itemLabel":"Event & Hospitality Venues","headingType":"h4","itemTitle":"","itemDesc":"<p class=\\"rteBlock\\">We also cater for private events and venue-based functions across North Sydney, including milestone celebrations, engagement parties, and community gatherings. Our scalable catering solutions adapt to different guest numbers, venue types, and service formats while maintaining consistent quality and presentation.</p>","showBtn":false,"textOnLink":"Item link","itemImgAlt":""}]`;

// Map to Waverley tabs
const waverleyTabs = {
  tabs: [
    {
      image: "",
      itemLabel: "Private Celebrations and Family Events",
      headingType: "h4",
      itemTitle: "",
      itemDesc: "<p class=\"rteBlock\">Bondi, Bronte and Tamarama host a high volume of family gatherings, milestone birthdays and backyard celebrations. We provide structured catering for private homes and outdoor spaces, with setup and pack-down handled by our team.</p>",
      showBtn: false,
      textOnLink: "Buy Tickets"
    },
    {
      image: "",
      itemLabel: "Corporate and Office Functions",
      headingType: "h4",
      itemTitle: "",
      itemDesc: "<p class=\"rteBlock\">Small businesses and professional offices across Waverley require dependable catering for meetings, staff events and client functions. Our service prioritises punctual delivery and presentation suited to professional environments.</p>",
      showBtn: false,
      textOnLink: "Buy Tickets"
    },
    {
      image: "",
      itemLabel: "Weddings and Engagement Celebrations",
      headingType: "h4",
      itemTitle: "",
      itemDesc: "<p class=\"rteBlock\">Many couples choose beachside or local venue receptions across Waverley. We provide tailored wedding menus with full setup, service staff and pack-down for both formal and casual wedding styles.</p>",
      showBtn: false,
      textOnLink: "Buy Tickets"
    },
    {
      image: "",
      itemLabel: "Community and Local Events",
      headingType: "h4",
      itemTitle: "",
      itemDesc: "<p class=\"rteBlock\">Local clubs, schools and community groups across Waverley regularly host events that require efficient catering for larger guest numbers. We support these events with buffet and spit roast formats suited to community gatherings.</p>",
      showBtn: false,
      textOnLink: "Item link",
      itemImgAlt: ""
    }
  ],
  showImages: true,
  layouts: "layout-a",
  mobileLayoutToggle: false,
  fullWidthImg: false,
  imagePosition: false
};

const newTabsConfig = JSON.stringify(waverleyTabs).replace(/"/g, '&quot;');
html = html.replace(/data-widget-config="[^"]*7b2ba547771b4d4db17e3e2b9f0abd0c[^"]*"/, `data-widget-config="${newTabsConfig}"`);

// Replace the Suburbs list
const oldSuburbsUl = `<ul class="defaultList bullet">
      <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
       <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
        North Sydney CBD - Miller Street offices, North Sydney Station precinct
       </span>
      </li>
      <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
       <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
        Kirribilli - Commercial offices and harbourside venues
       </span>
      </li>
      <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
       <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
        Neutral Bay - Military Road business district
       </span>
      </li>
      <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
       <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
        Crows Nest - Pacific Highway commercial area
       </span>
      </li>
      <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
       <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
        St Leonards - Hospital precinct and business centers
       </span>
      </li>
      <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
       <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
        Cremorne - Military Road offices
       </span>
      </li>
      <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
       <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
        Cammeray - Commercial properties
       </span>
      </li>
      <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
       <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
        Waverton - Business addresses
       </span>
      </li>
      <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
       <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
        McMahons Point - Waterfront corporate venues
       </span>
      </li>
      <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
       <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
        Lavender Bay - Commercial properties
       </span>
      </li>
      <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
       <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
        Milsons Point - Luna Park and corporate offices
       </span>
      </li>
     </ul>`;

const newSuburbsUl = `<ul class="defaultList bullet">
      <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
       <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
        Bondi — Beachside venues, private homes and event spaces
       </span>
      </li>
      <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
       <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
        Bondi Beach — Coastal celebrations and private functions
       </span>
      </li>
      <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
       <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
        Bronte — Private properties and outdoor event locations
       </span>
      </li>
      <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
       <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
        Tamarama — Small beachside gatherings and private events
       </span>
      </li>
      <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
       <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
        Dover Heights — Residential celebrations and private parties
       </span>
      </li>
      <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
       <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
        Queens Park — Local venues and community functions
       </span>
      </li>
      <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
       <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
        Bellevue Hill — Private properties and formal event catering
       </span>
      </li>
     </ul>`;

html = html.replace(oldSuburbsUl, newSuburbsUl);

// Replace the minimum order rules in Delivery Information
const oldMinOrdersUl = `<ul class="defaultList bullet">
         <li style="letter-spacing: initial;" no_space_b="true" no_space_e="true">
          <strong style="display: initial;">
           North Sydney CBD:
          </strong>
          <span style="display: initial;" single-space="true" no_space_b="true" no_space_e="true">
           <span style="display: initial;">
           </span>
          </span>
          <span style="display: initial;" no_space_b="true" no_space_e="true">
           &nbsp;$120 minimum order
          </span>
         </li>
         <li style="letter-spacing: initial;" no_space_b="true" no_space_e="true">
          <strong style="display: initial;">
           Kirribilli, Neutral Bay, Crows Nest:
          </strong>
          <span style="display: initial;" single-space="true" no_space_b="true" no_space_e="true">
           <span style="display: initial;">
           </span>
          </span>
          <span style="display: initial;" no_space_b="true" no_space_e="true">
           &nbsp;$150 minimum order
          </span>
         </li>
         <li style="letter-spacing: initial;" no_space_b="true" no_space_e="true">
          <strong style="display: initial;">
           Other North Sydney suburbs:
          </strong>
          <span style="display: initial;" single-space="true" no_space_b="true" no_space_e="true">
           <span style="display: initial;">
           </span>
          </span>
          <span style="display: initial;" no_space_b="true" no_space_e="true">
           &nbsp;$100 minimum order
          </span>
         </li>
        </ul>`;

const newMinOrdersUl = `<ul class="defaultList bullet">
         <li style="letter-spacing: initial;" no_space_b="true" no_space_e="true">
          <strong style="display: initial;">
           Bondi &amp; Bondi Beach:
          </strong>
          <span style="display: initial;" single-space="true" no_space_b="true" no_space_e="true">
           <span style="display: initial;">
           </span>
          </span>
          <span style="display: initial;" no_space_b="true" no_space_e="true">
           &nbsp;$120 minimum order
          </span>
         </li>
         <li style="letter-spacing: initial;" no_space_b="true" no_space_e="true">
          <strong style="display: initial;">
           Dover Heights, Bellevue Hill:
          </strong>
          <span style="display: initial;" single-space="true" no_space_b="true" no_space_e="true">
           <span style="display: initial;">
           </span>
          </span>
          <span style="display: initial;" no_space_b="true" no_space_e="true">
           &nbsp;$150 minimum order
          </span>
         </li>
         <li style="letter-spacing: initial;" no_space_b="true" no_space_e="true">
          <strong style="display: initial;">
           Other Waverley suburbs:
          </strong>
          <span style="display: initial;" single-space="true" no_space_b="true" no_space_e="true">
           <span style="display: initial;">
           </span>
          </span>
          <span style="display: initial;" no_space_b="true" no_space_e="true">
           &nbsp;$100 minimum order
          </span>
         </li>
        </ul>`;

html = html.replace(oldMinOrdersUl, newMinOrdersUl);

// Replace the accordion span with our interactive accordion HTML
const oldAccordionSpan = `<span dmle_extension="ssraccordion" icon="true" surround="false" data-dmtmpl="true" id="1256883319" class="u_1256883319 hasFullWidth">\n    <\/span>`;
const oldAccordionSpanAlt = `<span dmle_extension="ssraccordion" icon="true" surround="false" data-dmtmpl="true" id="1256883319" class="u_1256883319 hasFullWidth">\r\n    <\/span>`;

const newAccordionHtml = `<span dmle_extension="ssraccordion" icon="true" surround="false" data-dmtmpl="true" id="1256883319" class="u_1256883319 hasFullWidth">
    <span id="ssrWrap-1256883319">
      <style data-styled="true" data-styled-version="5.3.11">
@media all{.fXZVFL{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;gap:8px;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;padding:16px;padding-top:16px;padding-bottom:16px;border-bottom:1px solid #e3e3e3;}}/*!sc*/
@media all{.bzBBTt{aspect-ratio:1 / 1;width:30px;padding:8px;height:30px;}}/*!sc*/
@media (min-width:1025px){}/*!sc*/
@media (max-width:1024px) and (min-width:768px){}/*!sc*/
@media (max-width:767px){}/*!sc*/
@media all{.nXtpH{width:100%;height:100%;-webkit-transition:-webkit-transform 0.3s ease-in-out;-webkit-transition:transform 0.3s ease-in-out;transition:transform 0.3s ease-in-out;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;position:relative;}}/*!sc*/
@media all{.jxwvWq{-webkit-transition:all 0.5s ease-in-out;transition:all 0.5s ease-in-out;-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg);position:absolute;background-color:currentColor;width:10%;height:100%;left:50%;margin-left:-5%;top:50%;margin-top:-50%;}}/*!sc*/
@media all{.kEBKQa{-webkit-transition:all 0.5s ease-in-out;transition:all 0.5s ease-in-out;-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg);background-color:currentColor;position:absolute;width:100%;height:10%;left:50%;margin-left:-50%;top:50%;margin-top:-5%;opacity:0;}}/*!sc*/
@media all{.dygwmn{overflow:hidden;-webkit-transition:max-height 0.3s ease-out;transition:max-height 0.3s ease-out;height:auto;max-height:0;}}/*!sc*/
@media all{.chjLlT{padding:16px;padding-top:16px;padding-bottom:16px;margin:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;gap:24px;-webkit-align-items:flex-start;-webkit-box-align:flex-start;-ms-flex-align:flex-start;align-items:flex-start;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;}}/*!sc*/
@media (max-width:767px){.chjLlT{-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}}/*!sc*/
@media all{.hzZYLO{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;gap:16px;text-align:start;-webkit-flex:1;-ms-flex:1;flex:1;}}/*!sc*/
@media all{.eODSZX{-webkit-transition:all 0.5s ease-in-out;transition:all 0.5s ease-in-out;-webkit-transform:rotate(-90deg);-ms-transform:rotate(-90deg);transform:rotate(-90deg);position:absolute;background-color:currentColor;width:10%;height:100%;left:50%;margin-left:-5%;top:50%;margin-top:-50%;}}/*!sc*/
@media all{.eyQoqK{-webkit-transition:all 0.5s ease-in-out;transition:all 0.5s ease-in-out;-webkit-transform:rotate(-90deg);-ms-transform:rotate(-90deg);transform:rotate(-90deg);background-color:currentColor;position:absolute;width:100%;height:10%;left:50%;margin-left:-50%;top:50%;margin-top:-5%;opacity:1;}}/*!sc*/
data-styled.g2[id="sc-gEvEer"]{content:"fXZVFL,bzBBTt,nXtpH,jxwvWq,kEBKQa,dygwmn,chjLlT,hzZYLO,eODSZX,eyQoqK,"}/*!sc*/
@media all{.cqCbBg{-webkit-flex:1;-ms-flex:1;flex:1;}}/*!sc*/
data-styled.g3[id="sc-eqUAAy"]{content:"cqCbBg,"}/*!sc*/
@media all{.kOipFV{cursor:pointer;}}/*!sc*/
data-styled.g6[id="sc-iGgWBj"]{content:"kOipFV,"}/*!sc*/
@media all{.hKESMj{list-style-type:none;overflow:hidden;margin:0;padding:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;gap:10px;}}/*!sc*/
data-styled.g7[id="sc-gsFSXq"]{content:"hKESMj,"}/*!sc*/
@media all{#dm#dm#dm .dIKFnk.dIKFnk{margin:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;gap:8px;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-flex:1;-ms-flex:1;flex:1;text-align:start;font-family:Crimson Text;}}/*!sc*/
@media (min-width:1025px){#dm#dm#dm .dIKFnk.dIKFnk{font-size:24px;}}/*!sc*/
@media (max-width:1024px) and (min-width:768px){#dm#dm#dm .dIKFnk.dIKFnk{font-size:24px;}}/*!sc*/
@media (max-width:767px){#dm#dm#dm .dIKFnk.dIKFnk{font-size:19px;}}/*!sc*/
@media all{#dm#dm#dm .fnfebs.fnfebs{color:rgba(0,0,0,1);font-family:Crimson Text;}#dm#dm#dm .fnfebs.fnfebs p{margin-block:0;overflow-wrap:anywhere;}}/*!sc*/
@media (min-width:1025px){#dm#dm#dm .fnfebs.fnfebs{font-size:20px;}}/*!sc*/
@media (max-width:1024px) and (min-width:768px){#dm#dm#dm .fnfebs.fnfebs{font-size:20px;}}/*!sc*/
@media (max-width:767px){#dm#dm#dm .fnfebs.fnfebs{font-size:16px;}}/*!sc*/
data-styled.g9[id="sc-imWYAI"]{content:"dIKFnk,fnfebs,"}
      </style>
      <div data-auto="runtime-accordion-widget" class="sc-gEvEer">
       <ul data-grab="accordion-container" class="sc-gsFSXq hKESMj">
        <li data-grab="accordion-item-container" class="sc-iGgWBj kOipFV">
          <div tabindex="0" data-grab="accordion-item-title-wrapper" class="sc-gEvEer fXZVFL">
           <h3 data-auto="accordion-item-title" data-grab="accordion-item-title" class="sc-imWYAI dIKFnk">
            <span class="sc-eqUAAy cqCbBg">1. What catering options are available in Waverley?</span>
           </h3>
           <div data-grab="accordion-item-arrow-wrapper" class="sc-gEvEer bzBBTt">
            <div data-grab="accordion-item-arrow" class="sc-gEvEer nXtpH">
             <div class="sc-gEvEer">
              <div class="sc-gEvEer jxwvWq"></div>
              <div class="sc-gEvEer kEBKQa"></div>
             </div>
            </div>
           </div>
          </div>
          <div class="sc-gEvEer">
           <div class="sc-gEvEer dygwmn" style="max-height: max-content;">
            <div data-grab="accordion-item-desc" class="sc-gEvEer chjLlT">
             <div class="sc-gEvEer hzZYLO">
              <div data-auto="desc" data-grab="accordion-item-desc-text" class="sc-imWYAI fnfebs">
               <p class="rteBlock" no_space_b="true" no_space_e="true">Cater King offers a full range of catering formats across Waverley including spit roast, BBQ catering, buffet, finger food, plated dining and grazing tables. The right format depends on your event type, guest numbers and venue. Private celebrations and backyard events typically suit spit roast or BBQ formats, while corporate functions and formal receptions often suit buffet or plated service. Contact the team to discuss which format best matches your event.</p>
              </div>
             </div>
            </div>
           </div>
          </div>
        </li>
        <li data-grab="accordion-item-container" class="sc-iGgWBj kOipFV">
          <div tabindex="0" data-grab="accordion-item-title-wrapper" class="sc-gEvEer fXZVFL">
           <h3 data-auto="accordion-item-title" data-grab="accordion-item-title" class="sc-imWYAI dIKFnk">
            <span class="sc-eqUAAy cqCbBg">2. How much does event catering cost in Waverley?</span>
           </h3>
           <div data-grab="accordion-item-arrow-wrapper" class="sc-gEvEer bzBBTt">
            <div data-grab="accordion-item-arrow" class="sc-gEvEer nXtpH">
             <div class="sc-gEvEer">
              <div class="sc-gEvEer eODSZX"></div>
              <div class="sc-gEvEer eyQoqK"></div>
             </div>
            </div>
           </div>
          </div>
          <div class="sc-gEvEer">
           <div class="sc-gEvEer dygwmn">
            <div data-grab="accordion-item-desc" class="sc-gEvEer chjLlT">
             <div class="sc-gEvEer hzZYLO">
              <div data-auto="desc" data-grab="accordion-item-desc-text" class="sc-imWYAI fnfebs">
               <p class="rteBlock" no_space_b="true" no_space_e="true">Catering costs in Waverley vary by format, guest numbers and menu selection, with packages starting from $40 per head for on-site staffed service. Pricing depends on the meats or menu items selected, number of sides, service duration and any add-ons such as beverages or desserts. Request a fully itemised quote so you can compare exactly what is included before booking.</p>
              </div>
             </div>
            </div>
           </div>
          </div>
        </li>
        <li data-grab="accordion-item-container" class="sc-iGgWBj kOipFV">
          <div tabindex="0" data-grab="accordion-item-title-wrapper" class="sc-gEvEer fXZVFL">
           <h3 data-auto="accordion-item-title" data-grab="accordion-item-title" class="sc-imWYAI dIKFnk">
            <span class="sc-eqUAAy cqCbBg">3. Do you do spit roast catering near Bondi Beach?</span>
           </h3>
           <div data-grab="accordion-item-arrow-wrapper" class="sc-gEvEer bzBBTt">
            <div data-grab="accordion-item-arrow" class="sc-gEvEer nXtpH">
             <div class="sc-gEvEer">
              <div class="sc-gEvEer eODSZX"></div>
              <div class="sc-gEvEer eyQoqK"></div>
             </div>
            </div>
           </div>
          </div>
          <div class="sc-gEvEer">
           <div class="sc-gEvEer dygwmn">
            <div data-grab="accordion-item-desc" class="sc-gEvEer chjLlT">
             <div class="sc-gEvEer hzZYLO">
              <div data-auto="desc" data-grab="accordion-item-desc-text" class="sc-imWYAI fnfebs">
               <p class="rteBlock" no_space_b="true" no_space_e="true">Yes. Cater King provides spit roast catering across Bondi, Bondi Beach, Bronte and the wider Waverley area. The service includes on-site cooking, carving, sides and full setup and pack-down. Some beachside locations may require council permits for commercial food preparation; our team can advise on this when you confirm your venue.</p>
              </div>
             </div>
            </div>
           </div>
          </div>
        </li>
        <li data-grab="accordion-item-container" class="sc-iGgWBj kOipFV">
          <div tabindex="0" data-grab="accordion-item-title-wrapper" class="sc-gEvEer fXZVFL">
           <h3 data-auto="accordion-item-title" data-grab="accordion-item-title" class="sc-imWYAI dIKFnk">
            <span class="sc-eqUAAy cqCbBg">4. Can you cater a small private event in Waverley for under 30 people?</span>
           </h3>
           <div data-grab="accordion-item-arrow-wrapper" class="sc-gEvEer bzBBTt">
            <div data-grab="accordion-item-arrow" class="sc-gEvEer nXtpH">
             <div class="sc-gEvEer">
              <div class="sc-gEvEer eODSZX"></div>
              <div class="sc-gEvEer eyQoqK"></div>
             </div>
            </div>
           </div>
          </div>
          <div class="sc-gEvEer">
           <div class="sc-gEvEer dygwmn">
            <div data-grab="accordion-item-desc" class="sc-gEvEer chjLlT">
             <div class="sc-gEvEer hzZYLO">
              <div data-auto="desc" data-grab="accordion-item-desc-text" class="sc-imWYAI fnfebs">
               <p class="rteBlock" no_space_b="true" no_space_e="true">Yes. While most spit roast packages have a minimum of 20 guests, smaller private events are accommodated through alternative formats such as finger food or buffet catering, which scale more easily for intimate gatherings. Contact the team with your guest numbers and we will recommend the most suitable and cost-effective catering format.</p>
              </div>
             </div>
            </div>
           </div>
          </div>
        </li>
        <li data-grab="accordion-item-container" class="sc-iGgWBj kOipFV">
          <div tabindex="0" data-grab="accordion-item-title-wrapper" class="sc-gEvEer fXZVFL">
           <h3 data-auto="accordion-item-title" data-grab="accordion-item-title" class="sc-imWYAI dIKFnk">
            <span class="sc-eqUAAy cqCbBg">5. Do you provide corporate catering in the Eastern Suburbs?</span>
           </h3>
           <div data-grab="accordion-item-arrow-wrapper" class="sc-gEvEer bzBBTt">
            <div data-grab="accordion-item-arrow" class="sc-gEvEer nXtpH">
             <div class="sc-gEvEer">
              <div class="sc-gEvEer eODSZX"></div>
              <div class="sc-gEvEer eyQoqK"></div>
             </div>
            </div>
           </div>
          </div>
          <div class="sc-gEvEer">
           <div class="sc-gEvEer dygwmn">
            <div data-grab="accordion-item-desc" class="sc-gEvEer chjLlT">
             <div class="sc-gEvEer hzZYLO">
              <div data-auto="desc" data-grab="accordion-item-desc-text" class="sc-imWYAI fnfebs">
               <p class="rteBlock" no_space_b="true" no_space_e="true">Yes. Cater King services corporate clients across Waverley and the broader Eastern Suburbs including office lunches, client meetings, staff celebrations and product launches. Corporate packages include flexible scheduling, dietary requirement management and invoicing options for business accounts.</p>
              </div>
             </div>
            </div>
           </div>
          </div>
        </li>
       </ul>
       <script data-role="vanilla-accordion-fix">
       document.addEventListener('DOMContentLoaded', function() {
           function setupFaqAccordion() {
               var container = document.querySelector('[id="ssrWrap-1256883319"]');
               if (!container) return;
               if (container.dataset.faqSetup) return;
               container.dataset.faqSetup = 'true';
               
               var items = container.querySelectorAll('[data-grab="accordion-item-container"]');
               items.forEach(function(item) {
                   var titleWrapper = item.querySelector('[data-grab="accordion-item-title-wrapper"]');
                   var descWrapper = item.querySelector('.dygwmn');
                   var arrowWrapper = item.querySelector('[data-grab="accordion-item-arrow"]');
                   if (!titleWrapper || !descWrapper) return;
                   
                   titleWrapper.style.cursor = 'pointer';
                   
                   titleWrapper.addEventListener('click', function(e) {
                       e.preventDefault();
                       var isExpanded = descWrapper.style.maxHeight && descWrapper.style.maxHeight !== '0px' && descWrapper.style.maxHeight !== '0';
                       
                       items.forEach(function(otherItem) {
                           var otherDesc = otherItem.querySelector('.dygwmn');
                           var otherArrow = otherItem.querySelector('[data-grab="accordion-item-arrow"]');
                           if (otherDesc && otherDesc !== descWrapper) {
                               otherDesc.style.maxHeight = '0px';
                               if (otherArrow) {
                                   var inner = otherArrow.querySelector('.sc-gEvEer');
                                   var bars = inner ? inner.children : null;
                                   if (bars && bars.length >= 2) {
                                       bars[0].className = 'sc-gEvEer eODSZX';
                                       bars[1].className = 'sc-gEvEer eyQoqK';
                                   }
                               }
                           }
                       });
                       
                       if (isExpanded) {
                           descWrapper.style.maxHeight = '0px';
                           if (arrowWrapper) {
                               var inner = arrowWrapper.querySelector('.sc-gEvEer');
                               var bars = inner ? inner.children : null;
                               if (bars && bars.length >= 2) {
                                   bars[0].className = 'sc-gEvEer eODSZX';
                                   bars[1].className = 'sc-gEvEer eyQoqK';
                               }
                           }
                       } else {
                           descWrapper.style.maxHeight = descWrapper.scrollHeight + 'px';
                           if (arrowWrapper) {
                               var inner = arrowWrapper.querySelector('.sc-gEvEer');
                               var bars = inner ? inner.children : null;
                               if (bars && bars.length >= 2) {
                                   bars[0].className = 'sc-gEvEer jxwvWq';
                                   bars[1].className = 'sc-gEvEer kEBKQa';
                               }
                           }
                       }
                   });
               });
           }
           
           setupFaqAccordion();
           setTimeout(setupFaqAccordion, 1000);
           setTimeout(setupFaqAccordion, 3000);
       });
       </script>
      </div>
    </span>
   </span>`;

// Replace both variants of accordion span (with \\n and \\r\\n)
if (html.includes(oldAccordionSpan)) {
  html = html.replace(oldAccordionSpan, newAccordionHtml);
} else if (html.includes(oldAccordionSpanAlt)) {
  html = html.replace(oldAccordionSpanAlt, newAccordionHtml);
} else {
  // Let's replace by targeting the ID 1256883319
  html = html.replace(/<span dmle_extension="ssraccordion" icon="true" surround="false" data-dmtmpl="true" id="1256883319" class="u_1256883319 hasFullWidth">\s*<\/span>/, newAccordionHtml);
}

fs.writeFileSync(path.join(destDir, 'spit-roast-catering-waverley.html'), html, 'utf8');
console.log('Created spit-roast-catering-waverley.html');
