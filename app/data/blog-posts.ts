export interface BlogPost {
  id: string
  title: string
  date: string
  excerpt: string
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "new-arrivals-june-2025",
    title: "New Arrivals: Meet Our June 2025 Rescues",
    date: "2025-06-15",
    excerpt: "We've welcomed five new furry friends to our shelter this month. Learn about their stories and how you can help.",
    content: `
      <p>This June, we're thrilled to introduce five new rescues to our Pawsome family. Each of these dogs has a unique story, and we're committed to finding them loving forever homes.</p>
      
      <h2>Meet Our New Arrivals</h2>
      
      <h3>1. Rocky - 3-year-old Labrador Mix</h3>
      <p>Rocky came to us from an overcrowded shelter in a neighboring city. He's a bundle of energy who loves to play fetch and go for long walks.</p>
      
      <h3>2. Daisy - 5-year-old Beagle</h3>
      <p>Daisy was rescued from a puppy mill. Despite her rough start, she's incredibly sweet and is looking for a patient family to help her trust again.</p>
      
      <h3>3. Charlie - 2-year-old Poodle</h3>
      <p>Charlie was found as a stray, but his friendly demeanor suggests he once had a loving home. He's great with kids and other dogs.</p>
      
      <h3>4. Luna - 4-year-old Siberian Husky</h3>
      <p>Luna's family had to relocate and couldn't take her along. She's a beautiful, well-trained dog looking for an active household.</p>
      
      <h3>5. Max - 7-year-old Golden Retriever</h3>
      <p>Max is a senior dog whose owner passed away. He's gentle, loving, and would make a perfect companion for a calm household.</p>
      
      <p>If you're interested in meeting any of our new arrivals, please fill out our adoption form or visit us during our open hours. Remember, adopting a dog is a lifelong commitment, so be sure you're ready for the responsibility.</p>
      
      <p>Stay tuned for more updates on these lovely dogs and our other residents!</p>
    `
  },
  {
    id: "summer-adoption-event-2025",
    title: "Join Us for Our Summer Adoption Event",
    date: "2025-07-01",
    excerpt: "Mark your calendars for July 15th! We're hosting a special summer adoption event with activities for the whole family.",
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
      
      <h2>Special Adoption Offers</h2>
      <p>For this event, we're offering discounted adoption fees and a starter kit for every adopted dog, which includes:</p>
      <ul>
        <li>A collar and leash</li>
        <li>A bag of high-quality dog food</li>
        <li>A toy and treat</li>
        <li>A voucher for a free first check-up at our partner vet clinic</li>
      </ul>
      
      <p>Remember, adopting a dog is a big decision. Our staff will be on hand to answer all your questions and help you find the perfect match for your lifestyle.</p>
      
      <p>We can't wait to see you at this exciting event. Let's find forever homes for our furry friends together!</p>
    `
  }
]

