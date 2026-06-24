const fs = require('fs');
const path = require('path');

const basePath = __dirname;
const waverleyDir = path.join(basePath, 'spit-roast-catering-waverley');

function parseFaqs(contentFilePath) {
  const content = fs.readFileSync(contentFilePath, 'utf8');
  const faqs = [];
  const lines = content.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
  
  let faqStart = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.toLowerCase().includes('faqs about')) {
      faqStart = true;
      continue;
    }
    if (faqStart) {
      if (line.toLowerCase().includes('send us a message')) {
        break; // end of FAQs section
      }
      const match = line.match(/^(\d+)\.\s*(.+)$/);
      if (match) {
        const question = line;
        let answer = '';
        let j = i + 1;
        while (j < lines.length) {
          const nextLine = lines[j];
          if (nextLine.match(/^(\d+)\.\s*(.+)$/) || nextLine.toLowerCase().includes('send us a message')) {
            break;
          }
          answer += (answer ? ' ' : '') + nextLine;
          j++;
        }
        faqs.push({ q: question, a: answer });
        i = j - 1;
      }
    }
  }
  return faqs;
}

function generateAccordionHtml(faqs) {
  let html = `       <ul data-grab="accordion-container" class="sc-gsFSXq hKESMj">\n`;
  faqs.forEach((faq, index) => {
    const isFirst = index === 0;
    const arrowClasses = isFirst ? 'sc-gEvEer jxwvWq' : 'sc-gEvEer eODSZX';
    const arrowClass2 = isFirst ? 'sc-gEvEer kEBKQa' : 'sc-gEvEer eyQoqK';
    const styleAttr = isFirst ? ' style="max-height: max-content;"' : '';
    
    html += `        <li data-grab="accordion-item-container" class="sc-iGgWBj kOipFV">
          <div tabindex="0" data-grab="accordion-item-title-wrapper" class="sc-gEvEer fXZVFL">
           <h3 data-auto="accordion-item-title" data-grab="accordion-item-title" class="sc-imWYAI dIKFnk">
            <span class="sc-eqUAAy cqCbBg">${faq.q}</span>
           </h3>
           <div data-grab="accordion-item-arrow-wrapper" class="sc-gEvEer bzBBTt">
            <div data-grab="accordion-item-arrow" class="sc-gEvEer nXtpH">
             <div class="sc-gEvEer">
              <div class="${arrowClasses}"></div>
              <div class="${arrowClass2}"></div>
             </div>
            </div>
           </div>
          </div>
          <div class="sc-gEvEer">
           <div class="sc-gEvEer dygwmn"${styleAttr}>
            <div data-grab="accordion-item-desc" class="sc-gEvEer chjLlT">
             <div class="sc-gEvEer hzZYLO">
              <div data-auto="desc" data-grab="accordion-item-desc-text" class="sc-imWYAI fnfebs">
               <p class="rteBlock" no_space_b="true" no_space_e="true">${faq.a}</p>
              </div>
             </div>
            </div>
           </div>
          </div>
        </li>\n`;
  });
  html += `       </ul>`;
  return html;
}

const fileMapping = {
  cremorne: 'CATERING_CREMORNE_content.txt',
  'crows-nest': 'CATERING_CROWS_NEST_content.txt',
  'double-bay': 'CATERING_DOUBLE_BAY_content.txt',
  'neutral-bay': 'CATERING_NEUTRAL_BAY_content.txt'
};

// Ensure base directories exist
const suburbs = {
  cremorne: {
    name: 'Cremorne',
    nameUpper: 'CREMORNE',
    prefix: 'cremorneservice',
    slug: 'catering-cremorne',
    title: 'Catering Cremorne Sydney | Cater King',
    description: 'Spit roast and event catering in Cremorne from $40 per head. Corporate, private and wedding catering for Cremorne and Lower North Shore.',
    heroParagraph: 'Catering Cremorne delivers reliable corporate and event catering services for offices, businesses, and venues across Cremorne and the Lower North Shore. From daily office lunches along Military Road to weddings and private celebrations, every order is prepared with care, delivered on time, and tailored to suit your schedule so you can focus on the event while the food runs seamlessly in the background.',
    specialistHeader: 'Leading Catering Specialists, Cremorne',
    specialistIntro: 'Cater King delivers professional catering in Cremorne, servicing both corporate and private events with consistent quality and reliable execution. From boardroom meetings and office functions along the Military Road business strip to weddings, birthdays, and engagement celebrations, our team provides tailored catering solutions designed to match the size and style of your event.',
    specialistMiddle: 'Our services include corporate catering, spit roast, cocktail and finger food packages, buffet catering, plated dining, grazing tables, and individually packaged meals. We focus on fresh ingredients, clear menu structure, and flexible options to accommodate dietary requirements, ensuring a smooth experience for hosts and guests alike.',
    specialistOutro: 'With punctual delivery, experienced coordination, and scalable catering solutions, Cater King is a trusted provider for events across Cremorne. We combine efficient service with premium presentation to ensure your event runs seamlessly from start to finish.',
    services: {
      birthday: 'offers birthday catering services for children, adults, and milestone celebrations across Cremorne. Menus and service styles are tailored to the event, with options including finger food, buffet catering, BBQ, and spit roast for private homes and venues.',
      spitRoast: 'provides spit roast catering services in Cremorne featuring slow-roasted meats cooked and carved on-site. This service delivers a complete meal served with rolls, sides, and sauces, making it ideal for private gatherings, large events, and outdoor functions across the Lower North Shore.',
      corporate: 'provides corporate events and function catering designed for professional settings where timing, presentation, and reliability are essential. This service caters for meetings, office lunches, and company events along the Military Road precinct and surrounding business areas.',
      bbq: 'provides BBQ catering services focused on live grilling, fresh food, and relaxed service in Cremorne. This service is ideal for outdoor events, team celebrations, and private functions where freshly cooked food and easy service flow are important.',
      fingerFood: 'provides finger food catering services designed for events where guests are standing, mingling, or moving between conversations. Menus feature bite-sized, easy-to-eat items served hot or cold, ideal for corporate events, parties, and private functions across Cremorne.',
      wedding: 'offers wedding catering services designed to suit both intimate celebrations and larger wedding receptions across Cremorne and the Lower North Shore, with menus carefully planned to match the style, timing, and flow of the day.'
    },
    whyChoose: {
      intro: 'Cremorne sits along one of the Lower North Shore\'s busiest commercial strips, and the suburb also hosts a steady flow of private celebrations in its residential streets and waterfront pockets near Cremorne Point.',
      point1Title: '1. Reliable Corporate & Event Expertise',
      point1Desc: 'We understand the fast-paced nature of the Military Road business precinct and the broader Lower North Shore. From office lunches to private celebrations, our team delivers punctual, professional catering that runs smoothly from start to finish.',
      point2Title: '2. Flexible Menu Solutions',
      point2Desc: 'Our catering options include spit roast, cocktail finger food, buffets, grazing tables, and plated meals. Menus are adaptable to suit different event sizes and dietary requirements across Cremorne.',
      point3Title: '3. Efficient Coordination',
      point3Desc: 'Clear communication and organised logistics ensure your catering is delivered, set up, and managed with minimal stress, helping office and private events stay on schedule.',
      point4Title: '4. Consistent Quality & Presentation',
      point4Desc: 'We use fresh ingredients and structured preparation systems to maintain high standards in both flavour and presentation, suitable for corporate and private events across Cremorne and the Lower North Shore.'
    },
    tabs: [
      {
        image: "",
        itemLabel: "Corporate Functions Along Military Road",
        headingType: "h4",
        itemTitle: "",
        itemDesc: "<p class=\"rteBlock\">Businesses operating along Military Road and the surrounding Cremorne business district regularly require catering for staff lunches, client meetings, and team celebrations. We coordinate delivery timing around standard office hours and can accommodate recurring weekly or monthly catering arrangements.</p>",
        showBtn: false,
        textOnLink: "Buy Tickets"
      },
      {
        image: "",
        itemLabel: "Wedding and Engagement Party Catering",
        headingType: "h4",
        itemTitle: "",
        itemDesc: "<p class=\"rteBlock\">Cremorne and the nearby Cremorne Point foreshore are popular settings for engagement parties and smaller wedding celebrations. We provide tailored wedding menus with full setup, service staff, and pack-down suited to both waterfront gatherings and private home receptions.</p>",
        showBtn: false,
        textOnLink: "Buy Tickets"
      },
      {
        image: "",
        itemLabel: "Private Celebrations and Birthdays",
        headingType: "h4",
        itemTitle: "",
        itemDesc: "<p class=\"rteBlock\">From birthdays and anniversaries in Cremorne's residential streets to milestone events at local venues, our team delivers high-quality spit roast, buffet, and finger food catering designed to make hosting easy.</p>",
        showBtn: false,
        textOnLink: "Buy Tickets"
      },
      {
        image: "",
        itemLabel: "Waterfront and Foreshore Events",
        headingType: "h4",
        itemTitle: "",
        itemDesc: "<p class=\"rteBlock\">Events at Cremorne Point and local bays require experienced logistics around parking, access, and weather. We manage the setup and coordination so your outdoor gathering runs smoothly.</p>",
        showBtn: false,
        textOnLink: "Buy Tickets"
      }
    ],
    deliveryList: [
      'Cremorne — Military Road precinct, private homes and waterfront events',
      'Cremorne Point — Foreshore celebrations and small private gatherings',
      'Neutral Bay — Local venues and private functions',
      'Mosman — Residential celebrations and private parties',
      'Kirribilli — Private properties and small venue events',
      'North Sydney — Corporate and office functions',
      'Cammeray — Residential gatherings and community events'
    ],
    deliveryDesc: 'Our catering team is familiar with venue access, parking conditions and event logistics across Cremorne and the Lower North Shore, helping ensure food preparation, delivery and service run smoothly for corporate functions, private parties and weddings throughout the area.',
    faqTitle: 'FAQs About Catering in Cremorne',
    faqDesc: 'Planning an event in Cremorne and want to know how our catering works? The questions below cover what is included, how pricing works, and what to expect when you book with Cater King.',
    faqs: [
      {
        q: '1. What catering is available in Cremorne?',
        a: 'Cater King offers spit roast, BBQ, buffet, finger food and plated catering across Cremorne, suited to both office functions along Military Road and private celebrations. Contact the team to discuss which format suits your event.'
      },
      {
        q: '2. How much does event catering cost in Cremorne?',
        a: 'Catering costs in Cremorne depend on the format, guest numbers and menu selection, with packages starting from $40 per head for on-site staffed service. Request a fully itemised quote so you can compare exactly what is included before booking.'
      },
      {
        q: '3. Do you cater weddings on the Lower North Shore?',
        a: 'Yes. Cater King caters weddings and engagement celebrations across Cremorne, Cremorne Point and the broader Lower North Shore, including waterfront foreshore locations and private home receptions. Confirm your venue when booking so we can plan setup accordingly.'
      },
      {
        q: '4. What suburbs near Cremorne do you service?',
        a: 'Cater King services Cremorne and the surrounding Lower North Shore including Cremorne Point, Neutral Bay, Mosman, Kirribilli, North Sydney and Cammeray. Confirm your venue suburb when requesting a quote.'
      },
      {
        q: '5. Can you cater a corporate function in Cremorne?',
        a: 'Yes. Cater King caters office lunches, staff meetings and client functions for businesses along the Military Road precinct in Cremorne. We can arrange one-off corporate bookings or set up recurring weekly or monthly catering for regular office events.'
      }
    ]
  },
  'crows-nest': {
    name: 'Crows Nest',
    nameUpper: 'CROWS NEST',
    prefix: 'crowsnestservice',
    slug: 'catering-crows-nest',
    title: 'Catering Crows Nest Sydney | Cater King',
    description: 'Full-service catering in Crows Nest from $40 per head. Spit roast, corporate and private event catering for Crows Nest and Lower North Shore.',
    heroParagraph: 'Catering Crows Nest delivers reliable corporate and event catering services for offices, businesses, and venues across Crows Nest and the Lower North Shore. From daily office catering along the Pacific Highway corridor to private celebrations and restaurant precinct events, every order is prepared with care, delivered on time, and tailored to suit your schedule so you can focus on the event while the food runs seamlessly in the background.',
    specialistHeader: 'Leading Catering Specialists, Crows Nest',
    specialistIntro: 'Cater King delivers professional catering in Crows Nest, servicing both corporate and private events with consistent quality and reliable execution. From boardroom meetings and office functions near St Leonards to weddings, birthdays, and engagement celebrations, our team provides tailored catering solutions designed to match the size and style of your event.',
    specialistMiddle: 'A clarification many people search for: Cater King is a full-service catering company, not a catering supplies retailer. We prepare, deliver, set up, and serve your event from start to finish, rather than supplying equipment or hospitality products. Our services include corporate catering, spit roast, cocktail and finger food packages, buffet catering, plated dining, grazing tables, and individually packaged meals, with fresh ingredients and flexible options to accommodate dietary requirements.',
    specialistOutro: 'With punctual delivery, experienced coordination, and scalable catering solutions, Cater King is a trusted provider for events across Crows Nest. We combine efficient service with premium presentation to ensure your event runs seamlessly from start to finish.',
    services: {
      birthday: 'offers birthday catering services for children, adults, and milestone celebrations across Crows Nest. Menus and service styles are tailored to the event, with options including finger food, buffet catering, BBQ, and spit roast.',
      spitRoast: 'provides spit roast catering services in Crows Nest featuring slow-roasted meats cooked and carved on-site. This service delivers a complete meal served with rolls, sides, and sauces, making it ideal for private gatherings, large events, and outdoor functions across the Lower North Shore.',
      corporate: 'provides corporate events and function catering designed for professional settings where timing, presentation, and reliability are essential. This service caters for meetings, conferences, and company functions across the Pacific Highway and St Leonards business corridor.',
      bbq: 'provides BBQ catering services focused on live grilling, fresh food, and relaxed service in Crows Nest. This service is ideal for outdoor events, team celebrations, and private functions where freshly cooked food and easy service flow are important.',
      fingerFood: 'provides finger food catering services designed for events where guests are standing, mingling, or moving between conversations. Menus feature bite-sized, easy-to-eat items served hot or cold, ideal for corporate events, parties, and private functions across Crows Nest.',
      wedding: 'offers wedding catering services designed to suit both intimate celebrations and larger wedding receptions across Crows Nest and the Lower North Shore, with menus carefully planned to match the style and flow of the day.'
    },
    whyChoose: {
      intro: 'Crows Nest is one of the busier commercial precincts on the Lower North Shore, sitting alongside St Leonards\' growing business district and a well-established dining strip along the Pacific Highway.',
      point1Title: '1. Reliable Corporate & Event Expertise',
      point1Desc: 'We understand the busy commercial environment around the Pacific Highway, St Leonards and Crows Nest\'s well-known restaurant precinct. From client meetings to private celebrations, our team delivers punctual, professional catering that runs smoothly from start to finish.',
      point2Title: '2. Flexible Menu Solutions',
      point2Desc: 'Our catering options include spit roast, cocktail finger food, buffets, grazing tables, and plated meals. Menus are adaptable to suit different event sizes and dietary requirements across Crows Nest.',
      point3Title: '3. Efficient Coordination',
      point3Desc: 'Clear communication and organised logistics ensure your catering is delivered, set up, and managed with minimal stress, helping commercial and private events stay on schedule in a high-traffic business precinct.',
      point4Title: '4. Consistent Quality & Presentation',
      point4Desc: 'We use fresh ingredients and structured preparation systems to maintain high standards in both flavour and presentation, suitable for corporate and private events across Crows Nest.'
    },
    tabs: [
      {
        image: "",
        itemLabel: "Office Functions and Staff Events",
        headingType: "h4",
        itemTitle: "",
        itemDesc: "<p class=\"rteBlock\">Businesses based in Crows Nest and the neighbouring St Leonards business towers regularly require catering for staff lunches, team meetings, and milestone celebrations. We coordinate delivery to suit standard office hours and can accommodate recurring weekly catering arrangements.</p>",
        showBtn: false,
        textOnLink: "Buy Tickets"
      },
      {
        image: "",
        itemLabel: "St Leonards and Pacific Highway Precinct Events",
        headingType: "h4",
        itemTitle: "",
        itemDesc: "<p class=\"rteBlock\">The corridor between Crows Nest and St Leonards hosts a mix of corporate offices, medical and allied health practices, and professional services firms that require reliable catering for meetings, conferences, and client functions.</p>",
        showBtn: false,
        textOnLink: "Buy Tickets"
      },
      {
        image: "",
        itemLabel: "Private Celebrations and Precinct Gatherings",
        headingType: "h4",
        itemTitle: "",
        itemDesc: "<p class=\"rteBlock\">For birthday parties, engagement dinners, and social events held in residential homes or surrounding community spaces in Crows Nest, we provide a complete catering setup including spit roast, buffet, and finger food.</p>",
        showBtn: false,
        textOnLink: "Buy Tickets"
      },
      {
        image: "",
        itemLabel: "Medical and Allied Health Catering",
        headingType: "h4",
        itemTitle: "",
        itemDesc: "<p class=\"rteBlock\">With the Royal North Shore Hospital and private medical towers nearby, we regularly cater training sessions, staff lunches, and professional gatherings for medical and healthcare clinics, working within strict timelines.</p>",
        showBtn: false,
        textOnLink: "Buy Tickets"
      }
    ],
    deliveryList: [
      'Crows Nest — Pacific Highway precinct, restaurants strip and private functions',
      'St Leonards — Corporate towers, medical precinct and business events',
      'Artarmon — Residential gatherings and private celebrations',
      'North Sydney — Corporate functions and office events',
      'Cammeray — Local venues and private parties',
      'Naremburn — Residential celebrations and community events',
      'Wollstonecraft — Private properties and small group events',
      'Waverton — Residential gatherings and private functions',
      'Greenwich — Private properties and community celebrations'
    ],
    deliveryDesc: 'Our catering team is familiar with venue access, parking conditions and event logistics across Crows Nest and the Lower North Shore, helping ensure food preparation, delivery and service run smoothly for corporate functions, private parties and weddings throughout the area.',
    faqTitle: 'FAQs About Catering in Crows Nest',
    faqDesc: 'Planning an event in Crows Nest and want to know how our catering works? The questions below cover what is included, how pricing works, and what to expect when you book with Cater King.',
    faqs: [
      {
        q: '1. What catering services are available in Crows Nest?',
        a: 'Cater King offers spit roast, BBQ, buffet, finger food and plated catering across Crows Nest, suited to corporate functions in the St Leonards business precinct and private celebrations. Contact the team to discuss which option suits your event.'
      },
      {
        q: '2. Do you provide catering supplies in Crows Nest?',
        a: 'No. Cater King is a full-service catering company, not a catering supplies retailer. We prepare, deliver, set up and serve food directly at your event rather than supplying equipment or ingredients for self-catering. If you need food prepared and served for an event, that is exactly what we provide.'
      },
      {
        q: '3. How much does corporate catering cost in Crows Nest?',
        a: 'Corporate catering costs in Crows Nest depend on the format, guest numbers and menu selection, with packages starting from $40 per head for on-site staffed service. Request a fully itemised quote to compare exactly what is included.'
      },
      {
        q: '4. What suburbs near Crows Nest do you cover?',
        a: 'Cater King services Crows Nest and the surrounding Lower North Shore including St Leonards, Artarmon, North Sydney, Cammeray, Naremburn, Wollstonecraft, Waverton and Greenwich. Confirm your venue suburb when requesting a quote.'
      },
      {
        q: '5. Can you cater a private event in Crows Nest for under 50 guests?',
        a: 'Yes. While spit roast packages typically have a minimum of 20 guests, smaller private events are well suited to our finger food or buffet formats, which scale comfortably for groups of 20 to 50 people.'
      }
    ]
  },
  'double-bay': {
    name: 'Double Bay',
    nameUpper: 'DOUBLE BAY',
    prefix: 'doublebayservice',
    slug: 'catering-double-bay',
    title: 'Catering Double Bay Sydney | Cater King',
    description: 'Premium event and spit roast catering in Double Bay from $40 per head. Wedding, corporate and private catering for Double Bay and Eastern Suburbs.',
    heroParagraph: 'Catering Double Bay delivers premium corporate and event catering services for private homes, waterfront venues, and businesses across Double Bay and the Eastern Suburbs. From elegant wedding receptions to refined corporate functions, every order is prepared with care, delivered on time, and tailored to suit your schedule so you can focus on the event while the food runs seamlessly in the background.',
    specialistHeader: 'Leading Catering Specialists, Double Bay',
    specialistIntro: 'Cater King delivers professional catering in Double Bay, servicing weddings, corporate functions, and private events with consistent quality and reliable execution. From waterfront receptions and harbourside celebrations to client entertainment and milestone events, our team provides tailored catering solutions designed to match the size and style of your event.',
    specialistMiddle: 'Our services include corporate catering, spit roast, cocktail and finger food packages, buffet catering, plated dining, grazing tables, and individually packaged meals. We focus on fresh ingredients, refined presentation, and flexible options to accommodate dietary requirements, ensuring a smooth experience for hosts and guests alike.',
    specialistOutro: 'With punctual delivery, experienced coordination, and scalable catering solutions, Cater King is a trusted provider for events across Double Bay. We combine efficient service with premium presentation to ensure your event runs seamlessly from start to finish.',
    services: {
      birthday: 'offers birthday catering services for children, adults, and milestone celebrations across Double Bay. Menus and service styles are tailored to the event, with options including finger food, buffet catering, BBQ, and spit roast for private homes and waterfront venues.',
      spitRoast: 'provides spit roast catering services in Double Bay featuring slow-roasted meats cooked and carved on-site. This service delivers a complete meal served with rolls, sides, and sauces, making it ideal for private gatherings, large celebrations, and outdoor harbourside functions.',
      corporate: 'provides corporate events and function catering designed for professional settings where timing, presentation, and reliability are essential. This service caters for client entertainment, product launches, and company events across Double Bay.',
      bbq: 'provides BBQ catering services focused on live grilling, fresh food, and relaxed service in Double Bay. This service is ideal for outdoor events, waterfront celebrations, and private functions where freshly cooked food and easy service flow are important.',
      fingerFood: 'provides finger food catering services designed for events where guests are standing, mingling, or moving between conversations. Menus feature bite-sized, easy-to-eat items served hot or cold, ideal for cocktail parties, corporate events, and private functions across Double Bay.',
      wedding: 'offers wedding catering services designed to suit both intimate celebrations and larger wedding receptions across Double Bay, with menus carefully planned to match the style, timing, and refined flow of the day.'
    },
    whyChoose: {
      intro: 'Double Bay is one of Sydney\'s most prestigious harbourside suburbs, and catering here is typically expected to match the elevated standard of its waterfront venues and private residences.',
      point1Title: '1. Reliable Premium Event Expertise',
      point1Desc: 'We understand the elevated presentation standards expected at Double Bay\'s waterfront venues and private residences. From formal weddings to corporate client entertainment, our team delivers punctual, professional catering that runs smoothly from start to finish.',
      point2Title: '2. Flexible Menu Solutions',
      point2Desc: 'Our catering options include spit roast, cocktail finger food, buffets, grazing tables, and plated meals. Menus are adaptable to suit different event sizes and dietary requirements, with premium upgrades available for formal occasions across Double Bay.',
      point3Title: '3. Efficient Coordination',
      point3Desc: 'Clear communication and organised logistics ensure your catering is delivered, set up, and managed with minimal stress, helping waterfront and venue-based events stay on schedule.',
      point4Title: '4. Consistent Quality & Presentation',
      point4Desc: 'We use fresh ingredients and structured preparation systems to maintain high standards in both flavour and presentation, suitable for premium corporate and private events across Double Bay and the Eastern Suburbs.'
    },
    tabs: [
      {
        image: "",
        itemLabel: "Waterfront and Luxury Venue Catering",
        headingType: "h4",
        itemTitle: "",
        itemDesc: "<p class=\"rteBlock\">Double Bay's marina-front venues and private waterfront properties call for catering that matches the setting, from plated dining service to styled grazing table displays. We coordinate closely with venue staff on kitchen access, service timing, and presentation standards expected at premium locations.</p>",
        showBtn: false,
        textOnLink: "Buy Tickets"
      },
      {
        image: "",
        itemLabel: "Corporate Client Entertainment and Product Launches",
        headingType: "h4",
        itemTitle: "",
        itemDesc: "<p class=\"rteBlock\">Businesses hosting client entertainment, product launches, and executive functions in Double Bay require catering with a refined presentation standard. Our team can provide upgraded service including wait staff, real crockery, and styled food presentation suited to formal corporate occasions.</p>",
        showBtn: false,
        textOnLink: "Buy Tickets"
      },
      {
        image: "",
        itemLabel: "Harbourside Weddings and Receptions",
        headingType: "h4",
        itemTitle: "",
        itemDesc: "<p class=\"rteBlock\">Intimate harbourside receptions and garden weddings in prestigious Double Bay residences are supported by our full-service wedding packages, tailoring the service, timing, and menu to suit your special day.</p>",
        showBtn: false,
        textOnLink: "Buy Tickets"
      },
      {
        image: "",
        itemLabel: "Private Residences and Milestone Anniversaries",
        headingType: "h4",
        itemTitle: "",
        itemDesc: "<p class=\"rteBlock\">For milestone birthday celebrations and private dinners in Double Bay's residential streets, we deliver premium spit roast, buffet, and cocktail finger food catering with high-end upgrades available.</p>",
        showBtn: false,
        textOnLink: "Buy Tickets"
      }
    ],
    deliveryList: [
      'Double Bay — Waterfront venues, marina precinct and private residences',
      'Rose Bay — Harbourside properties and private celebrations',
      'Edgecliff — Local venues and private functions',
      'Woollahra — Residential celebrations and private parties',
      'Bellevue Hill — Private properties and formal event catering',
      'Point Piper — Premium waterfront residences and private events',
      'Darling Point — Harbourside properties and private celebrations',
      'Paddington — Private properties and small venue events'
    ],
    deliveryDesc: 'Our catering team is familiar with venue access, parking conditions and event logistics across Double Bay and the Eastern Suburbs, helping ensure food preparation, delivery and service run smoothly for weddings, corporate functions and private parties throughout the area.',
    faqTitle: 'FAQs About Catering in Double Bay',
    faqDesc: 'Planning an event in Double Bay and want to know how our catering works? The questions below cover what is included, how pricing works, and what to expect when you book with Cater King.',
    faqs: [
      {
        q: '1. What premium catering is available in Double Bay?',
        a: 'Cater King offers spit roast, BBQ, buffet, finger food and plated catering across Double Bay, with premium upgrades including real crockery, wait staff, and styled presentation suited to formal weddings and corporate events. Contact the team to discuss the right format for your occasion.'
      },
      {
        q: '2. Do you cater weddings in Double Bay?',
        a: 'Yes. Cater King caters weddings at Double Bay\'s waterfront venues and private residences, with tailored menus, full setup, and professional service staff suited to formal harbourside receptions. Book at least 3 to 4 weeks in advance for wedding catering in peak season.'
      },
      {
        q: '3. How much does catering cost per head in Double Bay?',
        a: 'Catering in Double Bay typically sits at the premium end of our pricing range given the presentation standards involved, with packages starting from $70 per head for upgraded formal service. Request a fully itemised quote to confirm exact pricing for your event.'
      },
      {
        q: '4. Can you cater a waterfront event in Double Bay?',
        a: 'Yes. Cater King caters events at Double Bay\'s marina-front venues and waterfront private properties. Our team coordinates with venue staff on kitchen access and service logistics specific to harbourside locations.'
      },
      {
        q: '5. What suburbs near Double Bay do you service?',
        a: 'Cater King services Double Bay and the surrounding Eastern Suburbs including Rose Bay, Edgecliff, Woollahra, Bellevue Hill, Point Piper, Darling Point and Paddington. Confirm your venue suburb when requesting a quote.'
      }
    ]
  },
  'neutral-bay': {
    name: 'Neutral Bay',
    nameUpper: 'NEUTRAL BAY',
    prefix: 'neutralbayservice',
    slug: 'catering-neutral-bay',
    title: 'Catering Neutral Bay Sydney | Cater King',
    description: 'Event and spit roast catering in Neutral Bay from $40 per head. Corporate, private and community catering for Neutral Bay and Lower North Shore.',
    heroParagraph: 'Catering Neutral Bay delivers reliable corporate and event catering services for offices, businesses, and private homes across Neutral Bay and the Lower North Shore. From office functions along Military Road to backyard celebrations and community events, every order is prepared with care, delivered on time, and tailored to suit your schedule so you can focus on the event while the food runs seamlessly in the background.',
    specialistHeader: 'Leading Catering Specialists, Neutral Bay',
    specialistIntro: 'Cater King delivers professional catering in Neutral Bay, servicing both corporate and private events with consistent quality and reliable execution. From office functions and client meetings along the Military Road business strip to weddings, birthdays, and family celebrations, our team provides tailored catering solutions designed to match the size and style of your event.',
    specialistMiddle: 'Our services include corporate catering, spit roast, cocktail and finger food packages, buffet catering, plated dining, grazing tables, and individually packaged meals. We focus on fresh ingredients, clear menu structure, and flexible options to accommodate dietary requirements, ensuring a smooth experience for hosts and guests alike.',
    specialistOutro: 'With punctual delivery, experienced coordination, and scalable catering solutions, Cater King is a trusted provider for events across Neutral Bay. We combine efficient service with premium presentation to ensure your event runs seamlessly from start to finish.',
    services: {
      birthday: 'offers birthday catering services for children, adults, and milestone celebrations across Neutral Bay. Menus and service styles are tailored to the event, with options including finger food, buffet catering, BBQ, and spit roast.',
      spitRoast: 'provides spit roast catering services in Neutral Bay featuring slow-roasted meats cooked and carved on-site. This service delivers a complete meal served with rolls, sides, and sauces, making it ideal for private gatherings, large events, and outdoor functions across the Lower North Shore.',
      corporate: 'provides corporate events and function catering designed for professional settings where timing, presentation, and reliability are essential. This service caters for meetings, client functions, and company events along the Military Road precinct in Neutral Bay.',
      bbq: 'provides BBQ catering services focused on live grilling, fresh food, and relaxed service in Neutral Bay. This service is ideal for outdoor events, team celebrations, and private functions where freshly cooked food and easy service flow are important.',
      fingerFood: 'provides finger food catering services designed for events where guests are standing, mingling, or moving between conversations. Menus feature bite-sized, easy-to-eat items served hot or cold, ideal for corporate events, parties, and private functions across Neutral Bay.',
      wedding: 'offers wedding catering services designed to suit both intimate celebrations and larger wedding receptions across Neutral Bay and the Lower North Shore, with menus carefully planned to match the style and flow of the day.'
    },
    whyChoose: {
      intro: 'Neutral Bay shares its commercial strip with Cremorne along Military Road, making this corridor one of the most active business precincts on the Lower North Shore alongside a strong residential community of families and long-term locals.',
      point1Title: '1. Reliable Corporate & Event Expertise',
      point1Desc: 'We understand the mix of office functions and residential family celebrations that define Neutral Bay. From client meetings along Military Road to backyard birthdays, our team delivers punctual, professional catering that runs smoothly from start to finish.',
      point2Title: '2. Flexible Menu Solutions',
      point2Desc: 'Our catering options include spit roast, cocktail finger food, buffets, grazing tables, and plated meals. Menus are adaptable to suit different event sizes and dietary requirements across Neutral Bay.',
      point3Title: '3. Efficient Coordination',
      point3Desc: 'Clear communication and organised logistics ensure your catering is delivered, set up, and managed with minimal stress, helping office and private events stay on schedule.',
      point4Title: '4. Consistent Quality & Presentation',
      point4Desc: 'We use fresh ingredients and structured preparation systems to maintain high standards in both flavour and presentation, suitable for corporate and private events across Neutral Bay and the Lower North Shore.'
    },
    tabs: [
      {
        image: "",
        itemLabel: "Military Road Precinct Office Functions",
        headingType: "h4",
        itemTitle: "",
        itemDesc: "<p class=\"rteBlock\">Offices and small businesses based along Military Road in Neutral Bay regularly require catering for staff lunches, team meetings, and milestone celebrations. We coordinate delivery around office hours and can arrange recurring weekly catering.</p>",
        showBtn: false,
        textOnLink: "Buy Tickets"
      },
      {
        image: "",
        itemLabel: "Client Entertainment and Product Launches",
        headingType: "h4",
        itemTitle: "",
        itemDesc: "<p class=\"rteBlock\">Businesses hosting client meetings or smaller product launches in Neutral Bay benefit from catering with a polished presentation standard. We provide upgraded service including platters, grazing displays, and finger food suited to professional settings.</p>",
        showBtn: false,
        textOnLink: "Buy Tickets"
      },
      {
        image: "",
        itemLabel: "Waterfront Park and Bay Gatherings",
        headingType: "h4",
        itemTitle: "",
        itemDesc: "<p class=\"rteBlock\">Neutral Bay's proximity to local bays and waterfront parks like Kurraba Point makes it popular for outdoor celebrations. We manage the delivery, permit coordination support, and setup logistics for outdoor events.</p>",
        showBtn: false,
        textOnLink: "Buy Tickets"
      },
      {
        image: "",
        itemLabel: "Private Celebrations and Backyard Parties",
        headingType: "h4",
        itemTitle: "",
        itemDesc: "<p class=\"rteBlock\">For birthdays, family reunions, and anniversaries in Neutral Bay's residential streets, our team provides full spit roast, buffet, and finger food setups, advising on space requirements for local properties.</p>",
        showBtn: false,
        textOnLink: "Buy Tickets"
      }
    ],
    deliveryList: [
      'Neutral Bay — Military Road precinct, private homes and local venues',
      'Cremorne — Local venues and private functions',
      'Mosman — Residential celebrations and private parties',
      'North Sydney — Corporate and office functions',
      'Kirribilli — Private properties and small venue events',
      'Cammeray — Residential gatherings and community events',
      'Waverton — Private properties and small group events',
      'Kurraba Point — Waterfront properties and private celebrations',
      'Wollstonecraft — Residential celebrations and community events'
    ],
    deliveryDesc: 'Our catering team is familiar with venue access, parking conditions and event logistics across Neutral Bay and the Lower North Shore, helping ensure food preparation, delivery and service run smoothly for corporate functions, private parties and community events throughout the area.',
    faqTitle: 'FAQs About Catering in Neutral Bay',
    faqDesc: 'Planning an event in Neutral Bay and want to know how our catering works? The questions below cover what is included, how pricing works, and what to expect when you book with Cater King.',
    faqs: [
      {
        q: '1. What catering is available in Neutral Bay?',
        a: 'Cater King offers spit roast, BBQ, buffet, finger food and plated catering across Neutral Bay, suited to office functions along Military Road and private family celebrations. Contact the team to discuss which format suits your event.'
      },
      {
        q: '2. Do you cater corporate events on the Lower North Shore?',
        a: 'Yes. Cater King regularly caters office lunches, staff meetings and client functions for businesses along Military Road in Neutral Bay and across the broader Lower North Shore. We can arrange one-off bookings or recurring weekly catering for regular team events.'
      },
      {
        q: '3. How much does spit roast catering cost in Neutral Bay?',
        a: 'Spit roast catering in Neutral Bay starts from $40 per head for on-site staffed packages, with pricing depending on guest numbers, meat selection, sides and service duration. Request a fully itemised quote to compare exactly what is included.'
      },
      {
        q: '4. What suburbs near Neutral Bay do you service?',
        a: 'Cater King services Neutral Bay and the surrounding Lower North Shore including Cremorne, Mosman, North Sydney, Kirribilli, Cammeray, Waverton, Kurraba Point and Wollstonecraft. Confirm your venue suburb when requesting a quote.'
      },
      {
        q: '5. Can you cater a private event in Neutral Bay?',
        a: 'Yes. Cater King caters private celebrations including birthdays, family gatherings and backyard parties throughout Neutral Bay\'s residential streets. Our team can advise on practical setup options for properties with limited parking access.'
      }
    ]
  }
};

// Helpers from generate_new_suburbs.js
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

function replaceEventsWidgetConfig(html, newConfigObj) {
  const newBase64 = Buffer.from(JSON.stringify(newConfigObj)).toString('base64');
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
    } catch (err) {}
  }
  
  if (targetBase64) {
    return html.replace(targetBase64, newBase64);
  } else {
    console.error(`Could not find target widget config containing 'North Sydney'!`);
    return html;
  }
}

// 1. Read Waverley templates
const wHtml = fs.readFileSync(path.join(waverleyDir, 'spit-roast-catering-waverley.html'), 'utf8');
const wCss = fs.readFileSync(path.join(waverleyDir, 'spit-roast-catering-waverley.css'), 'utf8');
const wDesktopCss = fs.readFileSync(path.join(waverleyDir, 'spit-roast-catering-waverley-desktop-tablet.css'), 'utf8');
const wMobileCss = fs.readFileSync(path.join(waverleyDir, 'spit-roast-catering-waverley-mobile.css'), 'utf8');

// 2. Generate each suburb
Object.entries(suburbs).forEach(([suburbKey, config]) => {
  console.log(`Generating files for ${config.name}...`);
  const destDir = path.join(basePath, `spit-roast-catering-${suburbKey}`);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  let html = wHtml;
  let css = wCss;
  let desktopCss = wDesktopCss;
  let mobileCss = wMobileCss;

  // General mappings
  css = css.replace(/waverleyservice/g, config.prefix);
  desktopCss = desktopCss.replace(/waverleyservice/g, config.prefix);
  mobileCss = mobileCss.replace(/waverleyservice/g, config.prefix);


  // Hero section replacements
  const heroSearch = /Catering Waverley delivers reliable corporate[\s\S]+?seamlessly in the background\./;
  html = html.replace(heroSearch, config.heroParagraph);

  // Specialists replacements
  html = html.replace('Leading Catering Specialists, Waverley', config.specialistHeader);
  
  const introSearch = /Cater King delivers professional catering in Waverley[\s\S]+?style of your event\./;
  html = html.replace(introSearch, config.specialistIntro);

  const middleSearch = /Our services include corporate catering,[\s\S]+?hosts and guests alike\./;
  html = html.replace(middleSearch, config.specialistMiddle);

  const outroSearch = /With punctual delivery, experienced coordination,[\s\S]+?start to finish\./;
  html = html.replace(outroSearch, config.specialistOutro);

  // Service cards replacements
  const serviceCards = {
    birthday: /offers birthday catering services[\s\S]+?without managing the food\./,
    spitRoast: /provides spit roast catering services featuring[\s\S]+?on-site experience\./,
    corporate: /provides corporate events and function catering designed[\s\S]+?smoothly and professionally\./,
    bbq: /provides BBQ catering services focused on[\s\S]+?smooth event experience\./,
    fingerFood: /provides finger food catering services designed[\s\S]+?from start to finish\./,
    wedding: /offers wedding catering services designed to suit[\s\S]+?overall celebration\./
  };

  html = html.replace(serviceCards.birthday, config.services.birthday);
  html = html.replace(serviceCards.spitRoast, config.services.spitRoast);
  html = html.replace(serviceCards.corporate, config.services.corporate);
  html = html.replace(serviceCards.bbq, config.services.bbq);
  html = html.replace(serviceCards.fingerFood, config.services.fingerFood);
  html = html.replace(serviceCards.wedding, config.services.wedding);

  // Why Choose replacements
  html = html.replace(/Why Choose Our[\s\S]+?Catering Services in Waverley/,
                      `Why Choose Our\n      </strong>\n      <span style="display: initial;" single-space="true" no_space_b="true" no_space_e="true">\n        <span style="display: initial;">\n        </span>\n      </span>\n      <strong class="m-font-size-32 font-size-40" style="display: initial; color: rgb(43, 157, 143); font-family: 'DM Serif Display';" no_space_b="true" no_space_e="true">\n        Catering Services in ${config.name}`);

  html = html.replace('1. Reliable Corporate &amp; Event Expertise', config.whyChoose.point1Title);
  html = html.replace(/We understand the fast-paced nature of events around Bondi and Waverley[\s\S]+?start to finish\./, config.whyChoose.point1Desc);
  
  html = html.replace('2. Flexible Menu Solutions', config.whyChoose.point2Title);
  html = html.replace(/Our catering options include corporate lunch boxes[\s\S]+?dietary requirements\./, config.whyChoose.point2Desc);
  
  html = html.replace('3. Efficient Coordination', config.whyChoose.point3Title);
  html = html.replace(/Clear communication and organised logistics[\s\S]+?stays on schedule\./, config.whyChoose.point3Desc);
  
  html = html.replace('4. Consistent Quality &amp; Presentation', config.whyChoose.point4Title);
  html = html.replace(/We use fresh ingredients and structured preparation systems[\s\S]+?Eastern Suburbs\./, config.whyChoose.point4Desc);

  // Events We Serve section intro
  html = html.replace('Events and Communities We Serve in Waverley', `Events and Communities We Serve in ${config.name}`);
  html = html.replace(/Waverley is a mix of residential, beachside and small commercial communities[\s\S]+?Waverley area\./, config.whyChoose.intro);

  // Events We Serve Widget
  const widgetConfig = {
    tabs: config.tabs,
    showImages: true,
    layouts: 'layout-a',
    mobileLayoutToggle: false,
    fullWidthImg: false,
    imagePosition: false
  };
  html = replaceEventsWidgetConfig(html, widgetConfig);

  // Suburbs Delivery List
  html = html.replace(/We provide catering delivery to all areas[\s\S]+?Waverley,\s*including:/, `Cater King provides catering services across ${config.name} and the surrounding Lower North Shore, supporting events in every suburb and surrounding community including:`);
  html = replaceSuburbsUl(html, `supporting events in every suburb and surrounding community including:`, config.deliveryList);
  html = html.replace(/Our delivery team knows Waverley[\s\S]+?on time, every time\./, config.deliveryDesc);

  // FAQs
  html = html.replace('FAQs about Catering Services in Waverley', config.faqTitle);
  html = html.replace('Planning an event in Waverley often comes with specific logistical and service questions. Below, we answer the most frequently asked questions about our catering services, menu flexibility, and event support.', config.faqDesc);

  const faqsFile = path.join('C:\\Users\\LENOVO\\Downloads', fileMapping[suburbKey]);
  const parsedFaqs = parseFaqs(faqsFile);
  const newAccordion = generateAccordionHtml(parsedFaqs);
  
  html = html.replace(/<ul data-grab="accordion-container" class="sc-gsFSXq hKESMj">[\s\S]+?<\/ul>/, newAccordion);

  // Global replacements at the very end
  html = html.replace(/waverleyservice/g, config.prefix);
  html = html.replace(/Waverley/g, config.name);
  html = html.replace(/WAVERLEY/g, config.nameUpper);
  html = html.replace(/\/catering-waverley/g, `/${config.slug}`);
  html = html.replace(/waverley service/g, `${config.name.toLowerCase()} service`);

  // Custom Head Section File
  const headSection = `  <title>
    ${config.title}
  </title>
  <meta name="description" content="${config.description}"/>
`;

  // Write files
  fs.writeFileSync(path.join(destDir, `${config.slug}.html`), html);
  fs.writeFileSync(path.join(destDir, `${config.slug}-head-section.html`), headSection);
  fs.writeFileSync(path.join(destDir, `${config.slug}.css`), css);
  fs.writeFileSync(path.join(destDir, `${config.slug}-desktop-tablet.css`), desktopCss);
  fs.writeFileSync(path.join(destDir, `${config.slug}-mobile.css`), mobileCss);

  console.log(`Successfully generated files for ${config.name}!`);
});

console.log('All 4 suburbs generated successfully!');
