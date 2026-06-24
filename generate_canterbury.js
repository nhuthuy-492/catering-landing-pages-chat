const fs = require('fs');
const path = require('path');

const basePath = 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\scratch\\spit-roast-landing-pages';
const waverleyDir = path.join(basePath, 'spit-roast-catering-waverley');
const canterburyDir = path.join(basePath, 'spit-roast-catering-canterbury');

// Ensure destination folder exists
if (!fs.existsSync(canterburyDir)) {
  fs.mkdirSync(canterburyDir, { recursive: true });
}

// 1. Read files
let html = fs.readFileSync(path.join(waverleyDir, 'spit-roast-catering-waverley.html'), 'utf8');
let head = fs.readFileSync(path.join(waverleyDir, 'spit-roast-catering-waverley-head-section.html'), 'utf8');
let css = fs.readFileSync(path.join(waverleyDir, 'spit-roast-catering-waverley.css'), 'utf8');
let desktopCss = fs.readFileSync(path.join(waverleyDir, 'spit-roast-catering-waverley-desktop-tablet.css'), 'utf8');
let mobileCss;
const fixedMobilePath = path.join(waverleyDir, 'spit-roast-catering-waverley-mobile-fixed.css');
if (fs.existsSync(fixedMobilePath)) {
  mobileCss = fs.readFileSync(fixedMobilePath, 'utf8');
} else {
  mobileCss = fs.readFileSync(path.join(waverleyDir, 'spit-roast-catering-waverley-mobile.css'), 'utf8');
}

// 2. Perform general replacements
function processGeneral(content) {
  let res = content;
  res = res.replace(/waverleyservice/g, 'canterburyservice');
  res = res.replace(/Waverley/g, 'Canterbury');
  res = res.replace(/waverley/g, 'canterbury');
  res = res.replace(/WAVERLEY/g, 'CANTERBURY');
  return res;
}

// Process CSS files
css = processGeneral(css);
desktopCss = processGeneral(desktopCss);
mobileCss = processGeneral(mobileCss);

// Process Head Section
head = `  <title>
    Catering Services in Canterbury | Cater King
  </title>
  <meta name="description" content="Professional catering in Canterbury for corporate events, community gatherings, weddings and private functions. Fresh menus, setup and service included."/>
`;

// Process Main HTML
html = processGeneral(html);

// Now do specific structural text replacements in Canterbury HTML
// Let's replace the Hero description paragraph
const waverleyHeroDesc = `Catering Canterbury delivers reliable corporate and event catering services for offices, businesses, and venues across Canterbury. From daily office catering and meetings to large-scale corporate events, every order is prepared with care, delivered on time, and tailored to suit your schedule so you can focus on the event while the food runs seamlessly in the background.`;
const canterburyHeroDesc = `Catering Canterbury delivers reliable corporate and event catering services for offices, businesses, and venues across Canterbury and the Canterbury-Bankstown area. From community gatherings and private celebrations to corporate functions, every order is prepared with care, delivered on time, and tailored to suit your schedule so you can focus on the event while the food runs seamlessly in the background.`;
html = html.replace(waverleyHeroDesc, canterburyHeroDesc);

// Section 2 specialists description paragraph 1
html = html.replace(
  `Cater King delivers professional catering in Canterbury, servicing both corporate and private events with consistent quality and reliable execution. From large business meetings and staff celebrations to private parties, birthdays, and engagement events, our team provides tailored catering solutions designed to match the size and style of your event.`,
  `Cater King delivers professional catering in Canterbury, servicing both corporate and private events with consistent quality and reliable execution. From community celebrations and cultural gatherings to weddings, birthdays, and engagement events across Canterbury-Bankstown, our team provides tailored catering solutions designed to match the size and style of your event.`
);

// Section 2 specialists description paragraph 3
html = html.replace(
  `Cater King manages the entire catering process from food preparation to event service, making our catering in Canterbury a reliable choice for hosts who want high-quality food and efficient service. With experienced staff and scalable menu packages, we support events of all sizes across Canterbury and the surrounding suburbs.`,
  `Cater King manages the entire catering process from food preparation to event service, making our catering in Canterbury a reliable choice for hosts who want high-quality food and efficient service. With experienced staff and scalable menu packages, we support events of all sizes across Canterbury and the Canterbury-Bankstown area.`
);

// Why Choose Us Tab 1 label and content
// Tab labels and contents in Waverley HTML (which became Canterbury in processGeneral)
// Tab 1:
html = html.replace(
  `We understand the fast-paced nature of events around Bondi and Canterbury. From private celebrations to corporate functions, our team delivers punctual, professional catering that runs smoothly from start to finish.`,
  `We understand the cultural diversity and community event culture of Canterbury-Bankstown. From cultural celebrations to private parties, our team delivers punctual, professional catering that runs smoothly from start to finish.`
);
// Tab 2:
html = html.replace(
  `Our catering options include spit roast, buffet, grazing tables, and plated meals. Menus are adaptable to suit different event sizes, dietary needs and preferences across Canterbury.`,
  `Our catering options include spit roast, halal-friendly menus, buffets, grazing tables, and plated meals. Menus are adaptable to suit different event sizes, cultural requirements and dietary needs across Canterbury.`
);
// Tab 3:
html = html.replace(
  `Clear communication and organised logistics ensure your catering is delivered, set up, and managed with minimal stress, helping your event stay on schedule.`,
  `Clear communication and organised logistics ensure your catering is delivered, set up, and managed with minimal stress, helping community events and private celebrations stay on schedule.`
);
// Tab 4:
html = html.replace(
  `We use fresh ingredients and structured preparation systems to maintain high standards in both flavour and presentation, suitable for corporate and private events across Canterbury and the Eastern Suburbs.`,
  `We use fresh ingredients and structured preparation systems to maintain high standards in both flavour and presentation, suitable for community, corporate and private events across Canterbury.`
);

// Events we serve:
html = html.replace(
  `Canterbury is a mix of residential, beachside and small commercial communities, each with different catering needs. Below is an overview of the event types we cater for across the Canterbury area.`,
  `Canterbury and the surrounding Canterbury-Bankstown area is one of Sydney's most culturally diverse regions, with a strong tradition of large community gatherings. Below is an overview of the event types we cater for across the area.`
);

// Events We Serve Tabs replacements
// Tab 1: "Corporate Events & Office Catering" -> "Cultural and Community Celebrations"
html = html.replace(
  `Many local businesses in Canterbury rely on professional catering for staff meetings, client functions, training days, and corporate celebrations. We offer flexible menus, dietary management, and invoicing.`,
  `Canterbury and surrounding suburbs regularly host cultural festivals, religious celebrations and large community gatherings. We provide catering with halal-friendly options and menu flexibility suited to multicultural event contexts.`
);
html = html.replace(`Corporate Events & Office Catering`, `Cultural and Community Celebrations`);

// Tab 2: "Private Gatherings & Birthdays" -> "Private Celebrations and Family Events"
html = html.replace(
  `From milestone birthdays to casual family gatherings and backyard celebrations, we provide buffet, spit roast, and BBQ options that allow hosts to relax and enjoy the event with their guests.`,
  `Family gatherings, milestone birthdays and backyard celebrations are common across Canterbury. Our catering setup allows hosts to provide freshly prepared meals while guests enjoy a relaxed social atmosphere.`
);
html = html.replace(`Private Gatherings & Birthdays`, `Private Celebrations and Family Events`);

// Tab 3: "Weddings & Receptions" -> "School and Community Group Events"
html = html.replace(
  `For weddings and engagement parties, Cater King provides comprehensive catering solutions including customized menus, professional service staff, and complete buffet setup to ensure a memorable experience.`,
  `Local schools, sporting clubs and community organisations across Canterbury-Bankstown require catering that serves large guest numbers efficiently. We support these events with buffet and spit roast formats suited to community-scale gatherings.`
);
html = html.replace(`Weddings & Receptions`, `School and Community Group Events`);

// Tab 4: "Social Functions & Receptions" -> "Weddings and Engagement Celebrations"
html = html.replace(
  `Whether it's a community celebration, a sports club event, or a large social gathering, our team handles delivery, setup, and cleanup so hosts can focus entirely on the event flow.`,
  `Many families across Canterbury choose traditional roasted meat catering for wedding receptions and engagement parties, providing generous meal options that comfortably serve large extended family gatherings.`
);
html = html.replace(`Social Functions & Receptions`, `Weddings and Engagement Celebrations`);

// Suburbs list replacement
html = html.replace(
  `We provide catering delivery to all areas of Canterbury, including:`,
  `Cater King provides catering services across the full Canterbury area and Canterbury-Bankstown local government area, supporting events in every suburb and surrounding community including:`
);

// Find and replace the suburbs <ul> block
const startUl = html.indexOf('<ul class="defaultList bullet">');
if (startUl !== -1) {
  const endUl = html.indexOf('</ul>', startUl);
  if (endUl !== -1) {
    const suburbsReplacement = `<ul class="defaultList bullet">
       <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
        <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
         Canterbury — Local venues, community halls and private properties
        </span>
       </li>
       <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
        <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
         Campsie — Community gatherings, cultural events and private functions
        </span>
       </li>
       <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
        <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
         Belmore — Local event spaces and private celebrations
        </span>
       </li>
       <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
        <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
         Lakemba — Community and cultural event venues
        </span>
       </li>
       <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
        <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
         Wiley Park — Residential gatherings and private parties
        </span>
       </li>
       <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
        <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
         Punchbowl — Local venues and community functions
        </span>
       </li>
       <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
        <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
         Hurlstone Park — Private properties and small event spaces
        </span>
       </li>
       <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
        <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
         Earlwood — Residential celebrations and backyard events
        </span>
       </li>
      </ul>`;
    html = html.substring(0, startUl) + suburbsReplacement + html.substring(endUl + 5);
  }
}

// Suburbs footer description:
html = html.replace(
  `Our delivery team knows Canterbury's building access requirements, parking regulations, and efficient delivery routes to ensure your catering Canterbury order arrives on time, every time.`,
  `Our catering team is familiar with venue access, parking conditions and event logistics across Canterbury and Canterbury-Bankstown, helping ensure food preparation, delivery and service run smoothly for community events, private parties and weddings throughout the area.`
);

// FAQs section replacement
html = html.replace(`FAQs about Catering Services in Canterbury`, `FAQs About Catering in Canterbury`);
html = html.replace(
  `Planning an event in Canterbury often comes with specific logistical and service questions. Below, we answer the most frequently asked questions about our catering services, menu flexibility, and event support.`,
  `Planning an event in Canterbury and want to know how our catering works? The questions below cover what is included, how pricing works, and what to expect when you book with Cater King.`
);

// FAQ Questions & Answers
// Q1: What catering options are available in Canterbury?
html = html.replace(`1. What catering options are available in Canterbury?`, `1. What catering is available in Canterbury Sydney?`);
html = html.replace(
  `Cater King offers a full range of catering formats across Canterbury including spit roast, BBQ catering, buffet, finger food, plated dining and grazing tables. The right format depends on your event type, guest numbers and venue. Private celebrations and backyard events typically suit spit roast or BBQ formats, while corporate functions and formal receptions often suit buffet or plated service. Contact the team to discuss which format best matches your event.`,
  `Cater King offers spit roast, BBQ, buffet, finger food and plated catering across Canterbury and Canterbury-Bankstown. Menu formats are selected based on event type, guest numbers and cultural requirements. Halal-friendly options are available across all formats. Contact the team to discuss the best format for your event.`
);

// Q2: How much does event catering cost in Canterbury?
html = html.replace(`2. How much does event catering cost in Canterbury?`, `2. How much does spit roast catering cost in the Canterbury area?`);
html = html.replace(
  `Catering costs in Canterbury vary by format, guest numbers and menu selection, with packages starting from $40 per head for on-site staffed service. Pricing depends on the meats or menu items selected, number of sides, service duration and any add-ons such as beverages or desserts. Request a fully itemised quote so you can compare exactly what is included before booking.`,
  `Spit roast catering in Canterbury starts from $40 per head for on-site staffed packages, with pricing depending on guest numbers, meat selection, sides and service duration. Larger community events typically receive more competitive per-head pricing due to economies of scale. Request a fully itemised quote to compare exactly what is included.`
);

// Q3: Do you do spit roast catering near Bondi Beach? (in processGeneral it became Canterbury) -> Do you cater community events in Canterbury-Bankstown?
html = html.replace(`3. Do you do spit roast catering near Canterbury Beach?`, `3. Do you cater community events in Canterbury-Bankstown?`);
html = html.replace(
  `Yes. Cater King provides spit roast catering across Canterbury, Canterbury Beach, Bronte and the wider Canterbury area. The service includes on-site cooking, carving, sides and full setup and pack-down. Some beachside locations may require council permits for commercial food preparation; our team can advise on this when you confirm your venue.`,
  `Yes. Cater King has extensive experience catering large community events, cultural festivals and religious celebrations across Canterbury-Bankstown. We recommend booking large community events at least 2 to 3 weeks in advance to allow for proper preparation and equipment coordination.`
);

// Q4: Can you cater a small private event in Canterbury for under 30 people? -> What suburbs near Canterbury do you service?
html = html.replace(`4. Can you cater a small private event in Canterbury for under 30 people?`, `4. What suburbs near Canterbury do you service?`);
html = html.replace(
  `Yes. While most spit roast packages have a minimum of 20 guests, smaller private events are accommodated through alternative formats such as finger food or buffet catering, which scale more easily for intimate gatherings. Contact the team with your guest numbers and we will recommend the most suitable and cost-effective catering format.`,
  `Cater King services the full Canterbury-Bankstown area including Campsie, Belmore, Lakemba, Wiley Park, Punchbowl, Hurlstone Park, Earlwood and surrounding suburbs. Contact the team with your venue suburb to confirm service availability and any applicable travel considerations.`
);

// Q5: Do you provide corporate catering in the Eastern Suburbs? -> Can you cater halal-friendly events in Canterbury?
html = html.replace(`5. Do you provide corporate catering in the Eastern Suburbs?`, `5. Can you cater halal-friendly events in Canterbury?`);
html = html.replace(
  `Yes. Cater King services corporate clients across Canterbury and the broader Eastern Suburbs including office lunches, client meetings, staff celebrations and product launches. Corporate packages include flexible scheduling, dietary requirement management and invoicing options for business accounts.`,
  `Yes. Halal-friendly menu options are available across our spit roast, BBQ and buffet catering formats in Canterbury. Let our team know your dietary and cultural requirements when requesting a quote so we can confirm menu options and sourcing in advance.`
);

// 3. Write files
fs.writeFileSync(path.join(canterburyDir, 'spit-roast-catering-canterbury.html'), html);
fs.writeFileSync(path.join(canterburyDir, 'spit-roast-catering-canterbury-head-section.html'), head);
fs.writeFileSync(path.join(canterburyDir, 'spit-roast-catering-canterbury.css'), css);
fs.writeFileSync(path.join(canterburyDir, 'spit-roast-catering-canterbury-desktop-tablet.css'), desktopCss);
fs.writeFileSync(path.join(canterburyDir, 'spit-roast-catering-canterbury-mobile.css'), mobileCss);

console.log('Canterbury files generated successfully!');
