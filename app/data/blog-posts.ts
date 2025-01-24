export interface BlogPost {
  id: string
  title: string
  date: string
  description: string
  content: string
  image: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "new-arrivals-june-2025",
    title: "New Arrivals: Meet Our June 2025 Rescues",
    date: "2025-06-15",
    description: "We've welcomed five new furry friends to our shelter this month. Learn about their stories and how you can help.",
    content: `
      <p>This June, we're thrilled to introduce five new rescues to our Pawsome family. Each of these dogs has a unique story, and we're committed to finding them loving forever homes.</p>
      
      <h2>Meet Our New Arrivals</h2>
      
      <h3>1. Rocky - 3-year-old Labrador Mix</h3>
      <p>Rocky came to us from an overcrowded shelter in a neighboring city. He's a bundle of energy who loves to play fetch and go for long walks.</p>
      
      <h3>2. Daisy - 5-year-old Beagle</h3>
      <p>Daisy was rescued from a puppy mill. Despite her rough start, she's incredibly sweet and is looking for a patient family to help her trust again.</p>      
    `,
    image: "https://placehold.co/400x400?text=New%20Arrivals%3A%20Meet%20Our%20June%202025%20Rescues",
  },
  {
    id: "summer-adoption-event-2025",
    title: "Join Us for Our Summer Adoption Event",
    date: "2025-07-01",
    description: "Mark your calendars for July 15th! We're hosting a special summer adoption event with activities for the whole family.",
    content: `
      <p>We're excited to announce our upcoming Summer Adoption Event on July 15th, 2025! This day-long celebration is not just about finding homes for our wonderful dogs, but also about educating the community on responsible pet ownership and the joys of adoption.</p>
      
      <h2>Event Details</h2>
      <ul>
        <li><strong>Date:</strong> July 15th, 2025</li>
        <li><strong>Time:</strong> 10:00 AM - 4:00 PM</li>
        <li><strong>Location:</strong> Pawsome Shelter grounds</li>
      </ul>
      
      <h2>Activities</h2>
      <ul>
        <li>Meet and Greet with adoptable dogs</li>
        <li>Pet care workshops</li>
        <li>Face painting for kids</li>
        <li>Local food trucks</li>
        <li>Raffle with amazing prizes</li>
      </ul>
      <p>Remember, adopting a dog is a big decision. Our staff will be on hand to answer all your questions and help you find the perfect match for your lifestyle.</p>
    `,
    image: "https://placehold.co/400x400?text=Join%20Us%20for%20Our%20Summer%20Adoption%20Event",
  },
  {
    id: "volunteer-spotlight-july-2025",
    title: "Volunteer Spotlight: Meet Our Amazing Helpers",
    date: "2025-07-05",
    description: "Highlighting the people behind the scenes who make everything possible.",
    content: `
      <p>Our volunteers dedicate countless hours to caring for our dogs. This month, we're celebrating their unwavering commitment.</p>
      <h2>Spotlight: Emma and James</h2>
      <p>Emma and James have been walking, grooming, and training our rescues since January. They've helped over 20 dogs find homes!</p>
    `,
    image: "https://placehold.co/400x400?text=Volunteer%20Spotlight%3A%20Meet%20Our%20Amazing%20Helpers",
  },
  {
    id: "safe-summer-travel-2025",
    title: "Tips for Safe Summer Travel with Your Dog",
    date: "2025-07-10",
    description: "Planning a vacation with your canine companion? Follow these tips to ensure a safe trip.",
    content: `
      <p>Whether you're road-tripping or flying, preparation is key. Make sure you have enough supplies, and don't forget frequent potty breaks.</p>
      <h2>Travel Checklist</h2>
      <ul>
        <li>Collar with updated ID tags</li>
        <li>Plenty of water and a portable bowl</li>
        <li>Comfortable carrier or harness</li>
      </ul>
    `,
    image: "https://placehold.co/400x400?text=Tips%20for%20Safe%20Summer%20Travel%20with%20Your%20Dog",
  },
  {
    id: "meet-siblings-2025",
    title: "Double the Love: Meet the Bonded Siblings Looking for a Home",
    date: "2025-07-15",
    description: "Two inseparable pups are searching for a family to adopt them together.",
    content: `
      <p>Siblings Bella and Bruno came to us from the same litter. These playful pups share everything, from toys to nap time.</p>
      <h2>Why Adopt a Bonded Pair?</h2>
      <p>They keep each other active and entertained, and the transition to a new home is easier when they're together.</p>
    `,
    image: "https://placehold.co/400x400?text=Double%20the%20Love%3A%20Meet%20the%20Bonded%20Siblings%20Looking%20for%20a%20Home",
  },
  {
    id: "senior-pups-2025",
    title: "Senior Pups: Why Older Dogs Make Great Companions",
    date: "2025-07-20",
    description: "Looking for a calmer, well-trained pet? Consider adopting a senior dog.",
    content: `
      <p>Our shelter has several dogs aged seven and up. They enjoy short walks, cozy naps, and plenty of affection.</p>
      <ul>
        <li>Often already house-trained</li>
        <li>Calmer dispositions</li>
        <li>Deep bonds with their owners</li>
      </ul>
    `,
    image: "https://placehold.co/400x400?text=Senior%20Pups%3A%20Why%20Older%20Dogs%20Make%20Great%20Companions",
  },
  {
    id: "healthy-summer-snacks-2025",
    title: "Healthy Summer Snacks Your Dog Will Love",
    date: "2025-07-25",
    description: "Easy and nutritious treats to help your pup stay cool this season.",
    content: `
      <p>From frozen peanut butter bites to homemade fruit popsicles, there's no shortage of fun ways to keep your dog refreshed.</p>
      <h2>Safe Ingredients</h2>
      <p>Opt for dog-safe fruits like watermelon, blueberries, or bananas. Always avoid added sugars.</p>
    `,
    image: "https://placehold.co/400x400?text=Healthy%20Summer%20Snacks%20Your%20Dog%20Will%20Love",
  },
  {
    id: "puppy-socialization-2025",
    title: "Puppy Socialization: Building Confidence Early",
    date: "2025-07-30",
    description: "A well-socialized puppy grows into a friendly, adaptable adult dog.",
    content: `
      <p>Introduce your new puppy to various people, places, and experiences in a positive way to help them gain confidence.</p>
      <h2>Key Steps</h2>
      <ul>
        <li>Short, pleasant outings</li>
        <li>Gentle exposure to new sights and sounds</li>
        <li>Reward good behavior</li>
      </ul>
    `,
    image: "https://placehold.co/400x400?text=Puppy%20Socialization%3A%20Building%20Confidence%20Early",
  },
  {
    id: "dog-friendly-summer-activities-2025",
    title: "Fun and Dog-Friendly Activities for the Summer",
    date: "2025-08-01",
    description: "Enjoy the warm weather with these outdoor adventures you can share with your pup.",
    content: `
      <p>Try a hike on a pet-friendly trail or a trip to a dog beach. Just remember to keep your dog hydrated and avoid peak heat.</p>
      <h2>Extra Precautions</h2>
      <p>Pack extra water, dog sunscreen, and a portable shade source to ensure a comfortable outing.</p>
    `,
    image: "https://placehold.co/400x400?text=Fun%20and%20Dog-Friendly%20Activities%20for%20the%20Summer",
  },
  {
    id: "fostering-benefits-2025",
    title: "Why Fostering Saves Lives: The Benefits of Temporary Homes",
    date: "2025-08-05",
    description: "Not ready to commit to adoption? Fostering could be the perfect solution.",
    content: `
      <p>When you foster, you provide essential care and socialization until a permanent home is found. It also helps free up space at the shelter.</p>
      <h2>Fostering Requirements</h2>
      <p>Time, patience, and a safe environment. We'll provide food, supplies, and medical care for the foster period.</p>
    `,
    image: "https://placehold.co/400x400?text=Why%20Fostering%20Saves%20Lives%3A%20The%20Benefits%20of%20Temporary%20Homes",
  }
]
