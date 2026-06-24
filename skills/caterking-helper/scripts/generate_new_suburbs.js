const fs = require('fs');
const path = require('path');

const basePath = 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\scratch\\spit-roast-landing-pages';
const waverleyDir = path.join(basePath, 'spit-roast-catering-waverley');
const annandaleDir = path.join(basePath, 'spit-roast-catering-annandale');
const bondiJunctionDir = path.join(basePath, 'spit-roast-catering-bondi-junction');

// Ensure destination directories exist
if (!fs.existsSync(annandaleDir)) {
  fs.mkdirSync(annandaleDir, { recursive: true });
}
if (!fs.existsSync(bondiJunctionDir)) {
  fs.mkdirSync(bondiJunctionDir, { recursive: true });
}

// 1. Read Waverley templates
const wHtml = fs.readFileSync(path.join(waverleyDir, 'spit-roast-catering-waverley.html'), 'utf8');
const wHead = fs.readFileSync(path.join(waverleyDir, 'spit-roast-catering-waverley-head-section.html'), 'utf8');
const wCss = fs.readFileSync(path.join(waverleyDir, 'spit-roast-catering-waverley.css'), 'utf8');
const wDesktopCss = fs.readFileSync(path.join(waverleyDir, 'spit-roast-catering-waverley-desktop-tablet.css'), 'utf8');
const wMobileCss = fs.readFileSync(path.join(waverleyDir, 'spit-roast-catering-waverley-mobile.css'), 'utf8');

// Helper to replace the suburbs list <ul> block
function replaceSuburbsUl(html, searchAfterText, newListItems) {
  const idx = html.indexOf(searchAfterText);
  if (idx === -1) {
    console.error('Could not find suburbs list search anchor: ' + searchAfterText);
    return html;
  }
  const startUl = html.indexOf('<ul class="defaultList bullet">', idx);
  if (startUl === -1) {
    console.error('Could not find suburbs list <ul>');
    return html;
  }
  const endUl = html.indexOf('</ul>', startUl);
  if (endUl === -1) {
    console.error('Could not find suburbs list </ul>');
    return html;
  }
  
  const suburbsReplacement = `<ul class="defaultList bullet">\n` + newListItems.map(item => {
    const parts = item.split(' — ');
    const name = parts[0];
    const desc = parts[1] || '';
    return `      <li class="m-size-16 size-20" style="color: rgb(0, 0, 0); letter-spacing: initial;" no_space_b="true" no_space_e="true">
       <span class="font-size-20 m-font-size-16" style="display: initial; font-family: 'Crimson Text'; font-weight: 400; color: rgb(0, 0, 0);" no_space_b="true" no_space_e="true">
        ${name}${desc ? ' — ' + desc : ''}
       </span>
      </li>`;
  }).join('\n') + `\n     </ul>`;
  
  return html.substring(0, startUl) + suburbsReplacement + html.substring(endUl + 5);
}

// Helper to dynamically replace widget config matching 'North Sydney'
function replaceEventsWidgetConfig(html, newConfigObj) {
  const newBase64 = Buffer.from(JSON.stringify(newConfigObj)).toString('base64');
  
  // Find all data-widget-config patterns
  const regex = /data-widget-config="([^"]+)"/g;
  let match;
  let targetBase64 = null;
  
  while ((match = regex.exec(html)) !== null) {
    try {
      const decoded = Buffer.from(match[1], 'base64').toString('utf8');
      if (decoded.includes('North Sydney') || decoded.includes('Corporate & Financial Services')) {
        targetBase64 = match[1];
        break;
      }
    } catch (err) {
      // Ignore invalid base64 widget configs
    }
  }
  
  if (targetBase64) {
    console.log(`Found target widget config base64! Replacing...`);
    // Replace only the first occurrence of this base64 string
    return html.replace(targetBase64, newBase64);
  } else {
    console.error(`Could not find target widget config containing 'North Sydney'!`);
    return html;
  }
}

// ==========================================
// ANNANDALE PAGE GENERATION
// ==========================================
console.log('Generating Annandale files...');

let aHtml = wHtml;
let aCss = wCss;
let aDesktopCss = wDesktopCss;
let aMobileCss = wMobileCss;

// General replacements for css / styles
aCss = aCss.replace(/waverleyservice/g, 'annandaleservice');
aDesktopCss = aDesktopCss.replace(/waverleyservice/g, 'annandaleservice');
aMobileCss = aMobileCss.replace(/waverleyservice/g, 'annandaleservice');

// General replacements for HTML
aHtml = aHtml.replace(/waverleyservice/g, 'annandaleservice');
aHtml = aHtml.replace(/Waverley/g, 'Annandale');
aHtml = aHtml.replace(/WAVERLEY/g, 'ANNANDALE');
aHtml = aHtml.replace(/\/catering-waverley/g, '/catering-annandale');
aHtml = aHtml.replace(/waverley service/g, 'annandale service');

// Custom Head Section
const aHead = `  <title>
    Catering Services in Annandale | Cater King
  </title>
  <meta name="description" content="Professional catering in Annandale for private events, corporate functions and community gatherings. Fresh menus, setup and service included."/>
`;

// Specific prose replacements
aHtml = aHtml.replace(
  `Catering Annandale delivers reliable corporate and event catering services for offices, businesses, and venues across Annandale. From daily office catering and meetings to large-scale corporate events, every order is prepared with care, delivered on time, and tailored to suit your schedule so you can focus on the event while the food runs seamlessly in the background.`,
  `Catering Annandale delivers reliable corporate and event catering services for offices, businesses, and private homes across Annandale and the Inner West. From backyard celebrations and private parties to corporate functions, every order is prepared with care, delivered on time, and tailored to suit your schedule so you can focus on the event while the food runs seamlessly in the background.`
);

aHtml = aHtml.replace(
  `Cater King delivers professional catering in Annandale, servicing both corporate and private events with consistent quality and reliable execution. From boardroom meetings, conferences, and office functions to weddings, birthdays, and engagement celebrations, our team provides tailored catering solutions designed to match the size and style of your event.`,
  `Cater King delivers professional catering in Annandale, servicing both private and corporate events with consistent quality and reliable execution. From backyard parties and birthday celebrations to corporate functions across the Inner West, our team provides tailored catering solutions designed to match the size and style of your event.`
);

aHtml = aHtml.replace(
  `With punctual delivery, experienced coordination, and scalable catering solutions, Cater King is a trusted provider for Annandale events. We combine efficient service with premium presentation to ensure your event runs seamlessly from start to finish.`,
  `With punctual delivery, experienced coordination, and scalable catering solutions, Cater King is a trusted provider for events across Annandale. We combine efficient service with premium presentation to ensure your event runs seamlessly from start to finish.`
);

aHtml = aHtml.replace(
  `We understand the fast-paced nature of events around Bondi and Annandale. From private celebrations to corporate functions, our team delivers punctual, professional catering that runs smoothly from start to finish.`,
  `We understand the residential and community character of Annandale. From backyard parties to small business functions, our team delivers punctual, professional catering that runs smoothly from start to finish.`
);

aHtml = aHtml.replace(
  `Our catering options include corporate lunch boxes, cocktail finger food, buffets, grazing tables, and plated meals. Menus are adaptable to suit different event sizes and dietary requirements.`,
  `Our catering options include spit roast, BBQ, buffets, grazing tables, and plated meals. Menus are adaptable to suit small to medium gatherings and dietary requirements across Annandale.`
);

aHtml = aHtml.replace(
  `Clear communication and organised logistics ensure your catering is delivered, set up, and managed with minimal stress. We focus on reliability so your event stays on schedule.`,
  `Clear communication and organised logistics ensure your catering is delivered, set up, and managed with minimal stress, helping your private event or function stay on schedule.`
);

aHtml = aHtml.replace(
  `We use fresh ingredients and structured preparation systems to maintain high standards in both flavour and presentation, suitable for corporate and private events across Annandale and the Eastern Suburbs.`,
  `We use fresh ingredients and structured preparation systems to maintain high standards in both flavour and presentation, suitable for private and corporate events across Annandale.`
);

// Service cards replacement
aHtml = aHtml.replace(
  `offers birthday catering services for children, adults, and milestone celebrations. Menus and service styles are tailored to the event, with options including finger food, buffet catering, BBQ, and spit roast. Catering is available for private homes, venues, and outdoor events, with setup and pack-down included so hosts can enjoy the celebration without managing the food.`,
  `offers birthday catering services for children, adults, and milestone celebrations across Annandale. Menus and service styles are tailored to the event, with options including finger food, buffet catering, BBQ, and spit roast for private homes and backyard events.`
);

aHtml = aHtml.replace(
  `provides spit roast catering services featuring slow-roasted meats cooked and carved on-site. This service delivers a complete meal served with rolls, sides, and sauces, making it ideal for corporate events, large gatherings, and outdoor functions. Spit roast catering includes equipment, service support, and pack-down for a smooth on-site experience.`,
  `provides spit roast catering services in Annandale featuring slow-roasted meats cooked and carved on-site. This service delivers a complete meal served with rolls, sides, and sauces, making it ideal for backyard parties and small to medium private gatherings.`
);

aHtml = aHtml.replace(
  `provides corporate events and function catering designed for professional settings where timing, presentation, and reliability are essential. This service caters for meetings, conferences, networking events, product launches, and company functions, with menu formats tailored to the event schedule and guest flow. Options include finger food, buffet catering, plated service, and working lunches, all supported by organised setup, attentive service, and pack-down to ensure business events run smoothly and professionally.`,
  `provides corporate events and function catering designed for professional settings where timing, presentation, and reliability are essential, suited to office functions and team events across the Inner West.`
);

aHtml = aHtml.replace(
  `provides BBQ catering services focused on live grilling, fresh food, and relaxed service. BBQ menus include grilled meats, vegetables, and sides, served through buffet setups, roll service, or managed BBQ stations depending on the event style. This service is ideal for outdoor events, corporate gatherings, team celebrations, and private functions where freshly cooked food and easy service flow are important. BBQ catering includes setup, on-site cooking, service support, and pack-down for a smooth event experience.`,
  `provides BBQ catering services focused on live grilling, fresh food, and relaxed service in Annandale. This service is ideal for outdoor events, backyard celebrations, and private functions where freshly cooked food and easy service flow are important.`
);

aHtml = aHtml.replace(
  `provides finger food catering services designed for events where guests are standing, mingling, or moving between conversations. Menus feature bite-sized, easy-to-eat items served hot or cold, allowing food to flow smoothly without the need for formal seating. Finger food catering is ideal for corporate events, parties, weddings, and private functions, offering flexible service, efficient setup, and professional presentation from start to finish.`,
  `provides finger food catering services designed for events where guests are standing, mingling, or moving between conversations. Menus feature bite-sized, easy-to-eat items served hot or cold, ideal for parties and private functions across Annandale.`
);

aHtml = aHtml.replace(
  `offers wedding catering services designed to suit both intimate celebrations and larger wedding receptions. Menus are carefully planned to match the style, timing, and flow of the day, with options including canap&eacute; service, buffet catering, plated meals, and shared feasting styles. Catering can be delivered at venues, private properties, or outdoor locations, with full setup, professional service, and pack-down included. Wedding catering is managed with attention to detail to ensure food service runs smoothly and complements the overall celebration.`,
  `offers wedding catering services designed to suit both intimate celebrations and larger wedding receptions in Annandale and the surrounding Inner West, with menus carefully planned to match the style and flow of the day.`
);

// Events and Communities
aHtml = aHtml.replace(
  `Annandale is a mix of residential, beachside and small commercial communities, each with different catering needs. Below is an overview of the event types we cater for across the Annandale area.`,
  `Annandale is a residential Inner West suburb known for its terrace homes, backyard entertaining and close-knit community character. Below is an overview of the event types we cater for across the area.`
);

// Decoded & Re-encoded Events We Serve Widget for Annandale
const aWidgetConfig = {
  "tabs": [
    {
      "image": "",
      "itemLabel": "Private Celebrations and Backyard Parties",
      "headingType": "h4",
      "itemTitle": "",
      "itemDesc": "<p class=\"rteBlock\">Annandale's terrace homes and backyards are popular settings for birthday parties, family gatherings and casual celebrations. Our catering setup is designed to fit smaller residential spaces while still delivering a generous spread.</p>",
      "showBtn": false,
      "textOnLink": "Buy Tickets"
    },
    {
      "image": "",
      "itemLabel": "Small Business and Office Functions",
      "headingType": "h4",
      "itemTitle": "",
      "itemDesc": "<p class=\"rteBlock\">Local businesses and home-based offices across Annandale and the surrounding Inner West require dependable catering for small team events and client meetings.</p>",
      "showBtn": false,
      "textOnLink": "Buy Tickets"
    },
    {
      "image": "",
      "itemLabel": "Community and Neighbourhood Events",
      "headingType": "h4",
      "itemTitle": "",
      "itemDesc": "<p class=\"rteBlock\">Local community groups and neighbourhood associations across Annandale occasionally host small to medium events that benefit from efficient, scalable catering formats.</p>",
      "showBtn": false,
      "textOnLink": "Buy Tickets"
    },
    {
      "image": "",
      "itemLabel": "Engagement and Milestone Celebrations",
      "headingType": "h4",
      "itemTitle": "",
      "itemDesc": "<p class=\"rteBlock\">Many residents choose backyard or terrace-style catering for engagement parties and milestone celebrations, providing a relaxed atmosphere with quality food.</p>",
      "showBtn": false,
      "textOnLink": "Buy Tickets"
    }
  ],
  "showImages": true,
  "layouts": "layout-a",
  "mobileLayoutToggle": false,
  "fullWidthImg": false,
  "imagePosition": false
};

aHtml = replaceEventsWidgetConfig(aHtml, aWidgetConfig);

// Suburbs list intro & list replace
aHtml = aHtml.replace(
  `We provide catering delivery to all areas of Annandale, including:`,
  `Cater King provides catering services across Annandale and the surrounding Inner West, supporting events in every suburb and surrounding community including:`
);

const aSuburbs = [
  'Annandale — Terrace homes, backyards and small private venues',
  'Glebe — Residential gatherings and small function spaces',
  'Leichhardt — Community venues and private properties',
  'Rozelle — Backyard events and local venue catering',
  'Forest Lodge — Residential and small group events',
  'Lilyfield — Private properties and community gatherings',
  'Balmain — Local venues and private celebrations'
];
aHtml = replaceSuburbsUl(aHtml, 'supporting events in every suburb and surrounding community including:', aSuburbs);

// Suburbs footer description
aHtml = aHtml.replace(
  `Our delivery team knows Annandale's building access requirements, parking regulations, and efficient delivery routes to ensure your catering Annandale order arrives on time, every time.`,
  `Our catering team is familiar with venue access, parking conditions and event logistics across Annandale and the Inner West, helping ensure food preparation, delivery and service run smoothly for private parties, small business functions and community events throughout the area.`
);

// FAQs section replacement
aHtml = aHtml.replace(`FAQs about Catering Services in Annandale`, `FAQs About Catering in Annandale`);
aHtml = aHtml.replace(
  `Planning an event in Annandale often comes with specific logistical and service questions. Below, we answer the most frequently asked questions about our catering services, menu flexibility, and event support.`,
  `Planning an event in Annandale and want to know how our catering works? The questions below cover what is included, how pricing works, and what to expect when you book with Cater King.`
);

// Accordion FAQ items
const aFaqs = [
  {
    q: '1. What catering services are available in Annandale?',
    a: 'Cater King offers spit roast, BBQ, buffet and finger food catering across Annandale, suited to backyard parties, small business functions and private celebrations. The right format depends on your venue size and guest numbers. Contact the team to discuss which option suits your event.'
  },
  {
    q: '2. How much does event catering cost in Annandale?',
    a: 'Catering costs in Annandale depend on the format, guest numbers and menu selection, with packages starting from $40 per head for on-site staffed service. Request a fully itemised quote so you can see exactly what is included before booking.'
  },
  {
    q: '3. Can you do a spit roast for a backyard party in Annandale?',
    a: 'Yes. Cater King provides spit roast catering for backyard parties and private celebrations across Annandale, with equipment, setup and pack-down included. Our team can advise on the space required for on-site cooking equipment given the typically smaller block sizes in the area.'
  },
  {
    q: '4. What areas near Annandale do you cover?',
    a: 'Cater King services Annandale and the surrounding Inner West including Glebe, Leichhardt, Rozelle, Forest Lodge, Lilyfield and Balmain. Confirm your venue suburb when requesting a quote.'
  },
  {
    q: '5. What is the minimum group size for catering in Annandale?',
    a: 'The minimum guest number for spit roast catering packages is typically 20 guests. For smaller gatherings, finger food or simplified buffet formats are available and scale more easily for intimate groups. Contact the team with your guest numbers for tailored recommendations.'
  }
];

// Replaces accordion FAQ titles and answers
for (let i = 0; i < 5; i++) {
  const waverleyQs = [
    `1. What catering options are available in Annandale?`,
    `2. How much does event catering cost in Annandale?`,
    `3. Do you do spit roast catering near Bondi Beach?`,
    `4. Can you cater a small private event in Annandale for under 30 people?`,
    `5. Do you provide corporate catering in the Eastern Suburbs?`
  ];
  
  const waverleyAs = [
    `Cater King offers a full range of catering formats across Annandale including spit roast, BBQ catering, buffet, finger food, plated dining and grazing tables. The right format depends on your event type, guest numbers and venue. Private celebrations and backyard events typically suit spit roast or BBQ formats, while corporate functions and formal receptions often suit buffet or plated service. Contact the team to discuss which format best matches your event.`,
    `Catering costs in Annandale vary by format, guest numbers and menu selection, with packages starting from $40 per head for on-site staffed service. Pricing depends on the meats or menu items selected, number of sides, service duration and any add-ons such as beverages or desserts. Request a fully itemised quote so you can compare exactly what is included before booking.`,
    `Yes. Cater King provides spit roast catering across Bondi, Bondi Beach, Bronte and the wider Annandale area. The service includes on-site cooking, carving, sides and full setup and pack-down. Some beachside locations may require council permits for commercial food preparation; our team can advise on this when you confirm your venue.`,
    `Yes. While most spit roast packages have a minimum of 20 guests, smaller private events are accommodated through alternative formats such as finger food or buffet catering, which scale more easily for intimate gatherings. Contact the team with your guest numbers and we will recommend the most suitable and cost-effective catering format.`,
    `Yes. Cater King services corporate clients across Annandale and the broader Eastern Suburbs including office lunches, client meetings, staff celebrations and product launches. Corporate packages include flexible scheduling, dietary requirement management and invoicing options for business accounts.`
  ];
  
  aHtml = aHtml.replace(waverleyQs[i], aFaqs[i].q);
  aHtml = aHtml.replace(waverleyAs[i], aFaqs[i].a);
}

// Write Annandale Files
fs.writeFileSync(path.join(annandaleDir, 'spit-roast-catering-annandale.html'), aHtml);
fs.writeFileSync(path.join(annandaleDir, 'spit-roast-catering-annandale-head-section.html'), aHead);
fs.writeFileSync(path.join(annandaleDir, 'spit-roast-catering-annandale.css'), aCss);
fs.writeFileSync(path.join(annandaleDir, 'spit-roast-catering-annandale-desktop-tablet.css'), aDesktopCss);
fs.writeFileSync(path.join(annandaleDir, 'spit-roast-catering-annandale-mobile.css'), aMobileCss);

console.log('Annandale files generated successfully!');


// ==========================================
// BONDI JUNCTION PAGE GENERATION
// ==========================================
console.log('Generating Bondi Junction files...');

let bHtml = wHtml;
let bCss = wCss;
let bDesktopCss = wDesktopCss;
let bMobileCss = wMobileCss;

// General replacements for css / styles
bCss = bCss.replace(/waverleyservice/g, 'bondijunctionservice');
bDesktopCss = bDesktopCss.replace(/waverleyservice/g, 'bondijunctionservice');
bMobileCss = bMobileCss.replace(/waverleyservice/g, 'bondijunctionservice');

// General replacements for HTML
bHtml = bHtml.replace(/waverleyservice/g, 'bondijunctionservice');
bHtml = bHtml.replace(/Waverley/g, 'Bondi Junction');
bHtml = bHtml.replace(/WAVERLEY/g, 'BONDI JUNCTION');
bHtml = bHtml.replace(/\/catering-waverley/g, '/catering-bondi-junction');
bHtml = bHtml.replace(/waverley service/g, 'bondi junction service');

// Custom Head Section
const bHead = `  <title>
    Catering Services in Bondi Junction | Cater King
  </title>
  <meta name="description" content="Professional catering in Bondi Junction for corporate events, weddings and private functions. Fresh menus, setup and service included."/>
`;

// Specific prose replacements
bHtml = bHtml.replace(
  `Catering Bondi Junction delivers reliable corporate and event catering services for offices, businesses, and venues across Bondi Junction. From daily office catering and meetings to large-scale corporate events, every order is prepared with care, delivered on time, and tailored to suit your schedule so you can focus on the event while the food runs seamlessly in the background.`,
  `Catering Bondi Junction delivers reliable corporate and event catering services for offices, businesses, and venues across Bondi Junction and the Eastern Suburbs. From daily office catering and client meetings to weddings and private celebrations, every order is prepared with care, delivered on time, and tailored to suit your schedule so you can focus on the event while the food runs seamlessly in the background.`
);

bHtml = bHtml.replace(
  `Cater King delivers professional catering in Bondi Junction, servicing both corporate and private events with consistent quality and reliable execution. From boardroom meetings, conferences, and office functions to weddings, birthdays, and engagement celebrations, our team provides tailored catering solutions designed to match the size and style of your event.`,
  `Cater King delivers professional catering in Bondi Junction, servicing both corporate and private events with consistent quality and reliable execution. From boardroom meetings and office functions near Westfield Bondi Junction to weddings, birthdays, and engagement celebrations, our team provides tailored catering solutions designed to match the size and style of your event.`
);

bHtml = bHtml.replace(
  `With punctual delivery, experienced coordination, and scalable catering solutions, Cater King is a trusted provider for Bondi Junction events. We combine efficient service with premium presentation to ensure your event runs seamlessly from start to finish.`,
  `With punctual delivery, experienced coordination, and scalable catering solutions, Cater King is a trusted provider for events across Bondi Junction. We combine efficient service with premium presentation to ensure your event runs seamlessly from start to finish.`
);

bHtml = bHtml.replace(
  `We understand the fast-paced nature of events around Bondi and Bondi Junction. From private celebrations to corporate functions, our team delivers punctual, professional catering that runs smoothly from start to finish.`,
  `We understand the fast-paced commercial environment around Westfield Bondi Junction. From client meetings to private celebrations, our team delivers punctual, professional catering that runs smoothly from start to finish.`
);

bHtml = bHtml.replace(
  `Our catering options include corporate lunch boxes, cocktail finger food, buffets, grazing tables, and plated meals. Menus are adaptable to suit different event sizes and dietary requirements.`,
  `Our catering options include spit roast, cocktail finger food, buffets, grazing tables, and plated meals. Menus are adaptable to suit different event sizes and dietary requirements across Bondi Junction.`
);

bHtml = bHtml.replace(
  `Clear communication and organised logistics ensure your catering is delivered, set up, and managed with minimal stress. We focus on reliability so your event stays on schedule.`,
  `Clear communication and organised logistics ensure your catering is delivered, set up, and managed with minimal stress, helping commercial and private events stay on schedule in a high-traffic precinct.`
);

bHtml = bHtml.replace(
  `We use fresh ingredients and structured preparation systems to maintain high standards in both flavour and presentation, suitable for corporate and private events across Bondi Junction and the Eastern Suburbs.`,
  `We use fresh ingredients and structured preparation systems to maintain high standards in both flavour and presentation, suitable for corporate and private events across Bondi Junction.`
);

// Service cards replacement
bHtml = bHtml.replace(
  `offers birthday catering services for children, adults, and milestone celebrations. Menus and service styles are tailored to the event, with options including finger food, buffet catering, BBQ, and spit roast. Catering is available for private homes, venues, and outdoor events, with setup and pack-down included so hosts can enjoy the celebration without managing the food.`,
  `offers birthday catering services for children, adults, and milestone celebrations across Bondi Junction. Menus and service styles are tailored to the event, with options including finger food, buffet catering, BBQ, and spit roast.`
);

bHtml = bHtml.replace(
  `provides spit roast catering services featuring slow-roasted meats cooked and carved on-site. This service delivers a complete meal served with rolls, sides, and sauces, making it ideal for corporate events, large gatherings, and outdoor functions. Spit roast catering includes equipment, service support, and pack-down for a smooth on-site experience.`,
  `provides spit roast catering services in Bondi Junction featuring slow-roasted meats cooked and carved on-site. This service delivers a complete meal served with rolls, sides, and sauces, making it ideal for private celebrations and larger events across the area.`
);

bHtml = bHtml.replace(
  `provides corporate events and function catering designed for professional settings where timing, presentation, and reliability are essential. This service caters for meetings, conferences, networking events, product launches, and company functions, with menu formats tailored to the event schedule and guest flow. Options include finger food, buffet catering, plated service, and working lunches, all supported by organised setup, attentive service, and pack-down to ensure business events run smoothly and professionally.`,
  `provides corporate events and function catering designed for professional settings where timing, presentation, and reliability are essential. This service caters for meetings, product launches and company functions near Westfield Bondi Junction and the surrounding commercial precinct.`
);

bHtml = bHtml.replace(
  `provides BBQ catering services focused on live grilling, fresh food, and relaxed service. BBQ menus include grilled meats, vegetables, and sides, served through buffet setups, roll service, or managed BBQ stations depending on the event style. This service is ideal for outdoor events, corporate gatherings, team celebrations, and private functions where freshly cooked food and easy service flow are important. BBQ catering includes setup, on-site cooking, service support, and pack-down for a smooth event experience.`,
  `provides BBQ catering services focused on live grilling, fresh food, and relaxed service in Bondi Junction. This service is ideal for outdoor events, team celebrations, and private functions where freshly cooked food and easy service flow are important.`
);

bHtml = bHtml.replace(
  `provides finger food catering services designed for events where guests are standing, mingling, or moving between conversations. Menus feature bite-sized, easy-to-eat items served hot or cold, allowing food to flow smoothly without the need for formal seating. Finger food catering is ideal for corporate events, parties, weddings, and private functions, offering flexible service, efficient setup, and professional presentation from start to finish.`,
  `provides finger food catering services designed for events where guests are standing, mingling, or moving between conversations. Menus feature bite-sized, easy-to-eat items served hot or cold, ideal for corporate events and cocktail parties across Bondi Junction.`
);

bHtml = bHtml.replace(
  `offers wedding catering services designed to suit both intimate celebrations and larger wedding receptions. Menus are carefully planned to match the style, timing, and flow of the day, with options including canap&eacute; service, buffet catering, plated meals, and shared feasting styles. Catering can be delivered at venues, private properties, or outdoor locations, with full setup, professional service, and pack-down included. Wedding catering is managed with attention to detail to ensure food service runs smoothly and complements the overall celebration.`,
  `offers wedding catering services designed to suit both intimate celebrations and larger wedding receptions across Bondi Junction and the Eastern Suburbs, with menus carefully planned to match the style and flow of the day.`
);

// Events and Communities
bHtml = bHtml.replace(
  `Bondi Junction is a mix of residential, beachside and small commercial communities, each with different catering needs. Below is an overview of the event types we cater for across the Bondi Junction area.`,
  `Bondi Junction is a major commercial and retail hub in the Eastern Suburbs, home to a mix of corporate offices, retail businesses and residential communities that require professional, reliable catering solutions.`
);

// Decoded & Re-encoded Events We Serve Widget for Bondi Junction
const bWidgetConfig = {
  "tabs": [
    {
      "image": "",
      "itemLabel": "Corporate and Retail Businesses",
      "headingType": "h4",
      "itemTitle": "",
      "itemDesc": "<p class=\"rteBlock\">Bondi Junction hosts major retail headquarters, professional offices and businesses around the Westfield precinct. We provide structured catering for meetings, staff events and client functions, prioritising punctual delivery and presentation suited to professional environments.</p>",
      "showBtn": false,
      "textOnLink": "Buy Tickets"
    },
    {
      "image": "",
      "itemLabel": "Private Celebrations and Family Events",
      "headingType": "h4",
      "itemTitle": "",
      "itemDesc": "<p class=\"rteBlock\">Residential areas surrounding Bondi Junction host family gatherings, milestone birthdays and private celebrations. Our catering setup supports both private homes and local venues.</p>",
      "showBtn": false,
      "textOnLink": "Buy Tickets"
    },
    {
      "image": "",
      "itemLabel": "Weddings and Engagement Celebrations",
      "headingType": "h4",
      "itemTitle": "",
      "itemDesc": "<p class=\"rteBlock\">Bondi Junction's proximity to Eastern Suburbs venues makes it a convenient base for wedding and engagement catering, with options for both formal receptions and casual celebrations.</p>",
      "showBtn": false,
      "textOnLink": "Buy Tickets"
    },
    {
      "image": "",
      "itemLabel": "Community and Social Events",
      "headingType": "h4",
      "itemTitle": "",
      "itemDesc": "<p class=\"rteBlock\">Local community groups and social clubs around Bondi Junction occasionally require catering for larger gatherings, supported by our scalable buffet and spit roast formats.</p>",
      "showBtn": false,
      "textOnLink": "Buy Tickets"
    }
  ],
  "showImages": true,
  "layouts": "layout-a",
  "mobileLayoutToggle": false,
  "fullWidthImg": false,
  "imagePosition": false
};

bHtml = replaceEventsWidgetConfig(bHtml, bWidgetConfig);

// Suburbs list intro & list replace
bHtml = bHtml.replace(
  `We provide catering delivery to all areas of Bondi Junction, including:`,
  `Cater King provides catering services across Bondi Junction and the surrounding Eastern Suburbs, supporting events in every suburb and surrounding community including:`
);

const bSuburbs = [
  'Bondi Junction — Commercial venues, offices and private functions',
  'Bondi — Beachside celebrations and private events',
  'Rose Bay — Private properties and waterfront venues',
  'Woollahra — Residential celebrations and private parties',
  'Double Bay — Premium private and corporate events',
  'Edgecliff — Local venues and private functions',
  'Paddington — Private properties and small venue events'
];
bHtml = replaceSuburbsUl(bHtml, 'supporting events in every suburb and surrounding community including:', bSuburbs);

// Suburbs footer description
bHtml = bHtml.replace(
  `Our delivery team knows Bondi Junction's building access requirements, parking regulations, and efficient delivery routes to ensure your catering Bondi Junction order arrives on time, every time.`,
  `Our catering team is familiar with venue access, parking conditions and event logistics across Bondi Junction and the Eastern Suburbs, helping ensure food preparation, delivery and service run smoothly for corporate functions, private parties and weddings throughout the area.`
);

// FAQs section replacement
bHtml = bHtml.replace(`FAQs about Catering Services in Bondi Junction`, `FAQs About Catering in Bondi Junction`);
bHtml = bHtml.replace(
  `Planning an event in Bondi Junction often comes with specific logistical and service questions. Below, we answer the most frequently asked questions about our catering services, menu flexibility, and event support.`,
  `Planning an event in Bondi Junction and want to know how our catering works? The questions below cover what is included, how pricing works, and what to expect when you book with Cater King.`
);

// Accordion FAQ items
const bFaqs = [
  {
    q: '1. What catering is available near Bondi Junction?',
    a: 'Cater King offers spit roast, BBQ, buffet, finger food and plated catering across Bondi Junction and the Eastern Suburbs, suited to both corporate functions and private celebrations. Contact the team to discuss which format suits your event.'
  },
  {
    q: '2. Do you do corporate catering in Bondi Junction?',
    a: 'Yes. Cater King regularly caters corporate functions, client meetings and staff events around the Westfield Bondi Junction precinct. Corporate packages include flexible scheduling, dietary requirement management and invoicing options for business accounts.'
  },
  {
    q: '3. How much does catering cost in Bondi Junction?',
    a: 'Catering costs in Bondi Junction depend on the format, guest numbers and menu selection, with packages starting from $40 per head for on-site staffed service. Request a fully itemised quote to compare exactly what is included.'
  },
  {
    q: '4. Can you cater a private event near Westfield Bondi Junction?',
    a: 'Yes. Cater King caters private events including birthdays, engagement parties and family celebrations in residential areas surrounding Bondi Junction. Contact the team with your venue address and guest numbers for a tailored quote.'
  },
  {
    q: '5. What suburbs near Bondi Junction do you service?',
    a: 'Cater King services Bondi Junction and the surrounding Eastern Suburbs including Bondi, Rose Bay, Woollahra, Double Bay, Edgecliff and Paddington. Confirm your venue suburb when requesting a quote.'
  }
];

// Replaces accordion FAQ titles and answers
for (let i = 0; i < 5; i++) {
  const waverleyQs = [
    `1. What catering options are available in Bondi Junction?`,
    `2. How much does event catering cost in Bondi Junction?`,
    `3. Do you do spit roast catering near Bondi Beach?`,
    `4. Can you cater a small private event in Bondi Junction for under 30 people?`,
    `5. Do you provide corporate catering in the Eastern Suburbs?`
  ];
  
  const waverleyAs = [
    `Cater King offers a full range of catering formats across Bondi Junction including spit roast, BBQ catering, buffet, finger food, plated dining and grazing tables. The right format depends on your event type, guest numbers and venue. Private celebrations and backyard events typically suit spit roast or BBQ formats, while corporate functions and formal receptions often suit buffet or plated service. Contact the team to discuss which format best matches your event.`,
    `Catering costs in Bondi Junction vary by format, guest numbers and menu selection, with packages starting from $40 per head for on-site staffed service. Pricing depends on the meats or menu items selected, number of sides, service duration and any add-ons such as beverages or desserts. Request a fully itemised quote so you can compare exactly what is included before booking.`,
    `Yes. Cater King provides spit roast catering across Bondi, Bondi Beach, Bronte and the wider Bondi Junction area. The service includes on-site cooking, carving, sides and full setup and pack-down. Some beachside locations may require council permits for commercial food preparation; our team can advise on this when you confirm your venue.`,
    `Yes. While most spit roast packages have a minimum of 20 guests, smaller private events are accommodated through alternative formats such as finger food or buffet catering, which scale more easily for intimate gatherings. Contact the team with your guest numbers and we will recommend the most suitable and cost-effective catering format.`,
    `Yes. Cater King services corporate clients across Bondi Junction and the broader Eastern Suburbs including office lunches, client meetings, staff celebrations and product launches. Corporate packages include flexible scheduling, dietary requirement management and invoicing options for business accounts.`
  ];
  
  bHtml = bHtml.replace(waverleyQs[i], bFaqs[i].q);
  bHtml = bHtml.replace(waverleyAs[i], bFaqs[i].a);
}

// Write Bondi Junction Files
fs.writeFileSync(path.join(bondiJunctionDir, 'spit-roast-catering-bondi-junction.html'), bHtml);
fs.writeFileSync(path.join(bondiJunctionDir, 'spit-roast-catering-bondi-junction-head-section.html'), bHead);
fs.writeFileSync(path.join(bondiJunctionDir, 'spit-roast-catering-bondi-junction.css'), bCss);
fs.writeFileSync(path.join(bondiJunctionDir, 'spit-roast-catering-bondi-junction-desktop-tablet.css'), bDesktopCss);
fs.writeFileSync(path.join(bondiJunctionDir, 'spit-roast-catering-bondi-junction-mobile.css'), bMobileCss);

console.log('Bondi Junction files generated successfully!');
