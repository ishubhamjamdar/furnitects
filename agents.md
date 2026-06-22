# Furnitects Partner Operations Website — Agents Specification

## Project Overview

**Name:** Furnitects Partner Operations Platform  
**Brand Tagline:** "Dream it, we'll design it."  
**Director:** Yash Bagmar  
**Contact:** +91 98819 84488 | support@furnitects.com | furnitects.com  
**Office:** No 910, Apex Business Court, Pune – 411037  

**Objective:** Build a conversion-focused website that streamlines the wardrobe catalog selection, instant quote generation, order confirmation, and delivery workflow for Furnitects' clients.

---

## Agent Roles & Responsibilities

### 1. **Frontend Agent** — UI/UX & Interaction Design
**Primary Responsibility:** Build responsive, interactive web interface for all client-facing pages.

**Deliverables:**
- Landing page with hero section, brand messaging, and CTAs
- Catalog showcase (4 wardrobe styles as interactive cards)
- Multi-step quote calculator (no login required)
  - Step 1: Browse & Select (catalog or custom design)
  - Step 2: Enter Dimensions (H × W × L fields)
  - Step 3: Get Instant Quote (price breakdown + WhatsApp CTA)
- Process/How It Works page (6-step timeline)
- Why Choose Furnitects value section
- Responsive mobile/tablet/desktop layouts
- Navigation bar with sticky quote calculator access
- Floating WhatsApp button (bottom-right)

**Technology Stack:**
- React or Next.js
- TypeScript
- Tailwind CSS or styled-components
- Form validation (React Hook Form or Formik)
- Responsive image optimization (next/image)

**Design Requirements:**
- Mobile-first responsive design
- Smooth animations & transitions
- High-quality product imagery/renders
- Icon system for 6-step process
- Ample whitespace & clean layout
- Touch-friendly buttons on mobile

**Success Metrics:**
- Quote calculator completion rate > 35%
- Mobile responsiveness (all breakpoints tested)
- Page load time < 3s on 4G
- Accessibility (WCAG AA)

---

### 2. **Backend Agent** — Quote Logic & Data Management
**Primary Responsibility:** Build quote calculation engine and manage order data.

**Deliverables:**
- Quote calculation API
  - Input: design type (catalog/custom), dimensions (H × W × L), customizations
  - Output: itemized price breakdown, total quote, unique quote ID
  - SLA: Return quote within 1 second of request
- Price sheet management (catalog styles + customization rules)
  - Hinged 2-Door: From ₹18,000
  - Sliding 3-Door: From ₹32,000
  - Walk-In Layout: From ₹65,000
  - Modular Open Shelving: From ₹22,000
  - Customization surcharges (materials, finishes, special dimensions)
- Quote history/logging (optional: for analytics & repeat clients)
- WhatsApp message generation (pre-filled quote message with order details)
- Error handling & validation
  - Dimension validation (min/max ranges)
  - Design validation (custom design specs completeness)

**Technology Stack:**
- Node.js + Express, Python + FastAPI, or Go
- Database: PostgreSQL, MongoDB, or Firebase/Supabase
- Environment variables for pricing (easy updates without code redeploy)
- REST API endpoints (or GraphQL if needed)
- Logging & monitoring (for SLA tracking)

**Key Data Models:**
```
Quote {
  id: string (unique)
  designType: 'hinged-2-door' | 'sliding-3-door' | 'walk-in' | 'modular' | 'custom'
  dimensions: { height: number, width: number, length: number, unit: 'cm' | 'inches' }
  customization: { materials: string, finish: string, addOns: string[] }
  basePrice: number
  customizationCharge: number
  totalPrice: number
  currency: 'INR'
  createdAt: timestamp
  expiresAt: timestamp (24h default)
  clientContact: string (optional, for WhatsApp)
}
```

**Success Metrics:**
- Quote generation SLA: 100% within 1 second
- Quote accuracy: 100% (no calculation errors)
- Uptime: > 99.5%
- Database query performance: < 200ms

---

### 3. **Integration Agent** — WhatsApp & External Services
**Primary Responsibility:** Connect quote data to WhatsApp, manage third-party integrations.

**Deliverables:**
- WhatsApp message generation & link formatting
  - Pre-filled quote message template:
    ```
    Hi! Here's your quote for [Design Name]:
    
    Dimensions: [H] × [W] × [L]
    Base Price: ₹[basePrice]
    Customization: ₹[customizationCharge]
    Total: ₹[totalPrice]
    
    Ready to proceed? Reply to confirm and choose your delivery date.
    ```
  - Dynamic link generation: `https://wa.me/919881984488?text=[encoded_quote_message]`
- Firebase/Supabase setup (if using for database & auth)
- Google Analytics integration (track quote calculator funnel, conversions)
- Meta Pixel / Facebook Conversion Tracking (optional)
- Email notifications (optional: send quote confirmation to client email if provided)
- SMS/WhatsApp API integration for 1-hour quote SLA reminder (optional)

**Technology Stack:**
- WhatsApp Web API (or Twilio WhatsApp Business API for scale)
- Firebase Admin SDK or Supabase SDK
- Google Analytics 4 (GA4)
- Mixpanel or Segment (optional: advanced event tracking)

**Key Integration Points:**
- Frontend → Backend: Quote calculation request & response
- Backend → WhatsApp: Pre-formatted message with quote details
- Frontend → Analytics: Event logging (page views, quote steps, conversions)
- Backend → Database: Quote persistence & history

**Success Metrics:**
- WhatsApp click-through rate > 40% of quote completions
- Message delivery success: 99%+
- Analytics data accuracy (cross-check with GA)

---

### 4. **Design & Brand Agent** — Visual Identity & UX Direction
**Primary Responsibility:** Define and maintain brand consistency across the website.

**Deliverables:**
- Color palette definition & hex codes
  - Primary: Deep navy (#1E2761) or charcoal (#36454F)
  - Secondary: Warm cream (#ECE2D0) or off-white (#F2F2F2)
  - Accent: Emerald green (#028090) or warm gold (#D4AF37)
- Typography system
  - Headers: Cambria or Poppins (bold, 36-48pt)
  - Body: Inter or Roboto (regular, 14-16pt)
  - Emphasis: Italic for key stats
- Visual motifs
  - Icons for 6-step process (custom SVG or icon library)
  - Product photography guidelines
  - Geometric shapes or wood-grain textures (subtle)
- Design component library
  - Button styles (primary, secondary, ghost)
  - Form inputs & validation states
  - Card layouts (catalog, testimonial, feature)
  - Alert/success message styles
- Figma/Adobe XD design file (optional: hand-off to frontend team)

**Design Principles:**
- Minimalism: Ample whitespace, avoid clutter
- Accessibility: High contrast (WCAG AA), readable font sizes
- Trust: Professional, clean, furniture-focused aesthetic
- Speed: Visual emphasis on "60 MINUTES" and "instant quote"
- Hierarchy: Clear CTAs, prominent value propositions

**Success Metrics:**
- Design system completeness: 100% coverage of UI components
- Brand consistency: All pages follow color & typography guidelines
- Accessibility audit: No WCAG AA violations

---

### 5. **Content & Messaging Agent** — Copy & SEO
**Primary Responsibility:** Write persuasive, SEO-optimized copy aligned with brand voice.

**Deliverables:**
- Landing page copy
  - Hero headline: "Dream it, we'll design it."
  - Subheading: "Custom wardrobes designed to fit your space. Quoted in 60 minutes."
  - Value props: no wasted visits, 1-hour SLA, trust loop, pricing edge
- Catalog descriptions (4 styles)
  - Hinged 2-Door: "Classic swing-door wardrobe — ideal for compact bedrooms"
  - Sliding 3-Door: "Space-saving sliding panels for larger storage needs"
  - Walk-In Layout: "Open hanging rods & shelving for a dedicated space"
  - Modular Open Shelving: "Flexible cube shelving — mix open & closed storage"
- Process page narrative (6-step journey storytelling)
- CTA copy variations (A/B test ready)
  - Primary: "Get a Quote Now" vs. "Start Your Design"
  - Secondary: "Explore Catalog" vs. "See Styles"
- FAQ section (common questions about process, pricing, delivery, customization)
- Meta tags & SEO optimization
  - Title tags (50-60 chars)
  - Meta descriptions (150-160 chars)
  - H1, H2, H3 hierarchy
  - Schema markup (LocalBusiness, Product, FAQPage)
- Blog/content strategy (optional: furniture design tips, wardrobe inspiration)

**Tone & Voice:**
- Confident & client-centric
- Speed-focused language (60 minutes, instant, fast)
- Trustworthy & transparent
- Straightforward, jargon-free
- Emphasis on "no wasted visits" & post-delivery support

**Success Metrics:**
- Organic search traffic (target: 500+ monthly sessions within 6 months)
- Meta tag optimization: 100% coverage
- CTA conversion rate: > 15%
- FAQ page engagement: > 25% of visitors

---

### 6. **QA & Testing Agent** — Quality Assurance & Validation
**Primary Responsibility:** Ensure all systems work correctly across devices, browsers, and scenarios.

**Deliverables:**
- Functional testing checklist
  - Quote calculator: all inputs, dimension validation, price accuracy
  - WhatsApp link generation: message formatting, URL encoding
  - Mobile responsiveness: all breakpoints (320px, 768px, 1024px, 1440px)
  - Browser compatibility: Chrome, Firefox, Safari, Edge (latest versions)
  - Form submission & error handling
- Performance testing
  - Page load time: < 3s on 4G connection
  - Quote API response: < 1 second
  - Lighthouse score: > 90 (Performance, Accessibility, Best Practices, SEO)
- User journey testing
  - New visitor → catalog browse → select design → enter dimensions → get quote → WhatsApp
  - Custom design path → upload/describe → dimensions → quote → WhatsApp
  - Mobile user experience (touch targets, input focus, scrolling)
- Accessibility testing
  - WCAG AA compliance scan (axe, Lighthouse)
  - Keyboard navigation (tab order, focus indicators)
  - Screen reader testing (NVDA, JAWS)
- Security testing
  - Form input validation (no SQL injection, XSS)
  - API authentication (if needed)
  - HTTPS enforcement
  - Privacy: no data leaks in URLs or logs

**Tools:**
- Jest or Vitest (unit tests)
- Cypress or Playwright (E2E tests)
- Lighthouse CI
- axe DevTools or WAVE (accessibility)
- Burp Suite or OWASP ZAP (security scan)

**Test Coverage Targets:**
- Unit tests: > 80% code coverage
- E2E tests: all critical user flows covered
- Accessibility: 0 WCAG AA violations
- Performance: all pages pass Lighthouse 90+

**Success Metrics:**
- Bug escape rate: < 5% (issues found in production)
- Test execution: 100% of tests passing pre-release
- Uptime: 99.5%+ after launch

---

### 7. **DevOps & Deployment Agent** — Infrastructure & Hosting
**Primary Responsibility:** Build deployment pipeline, manage hosting, monitor performance.

**Deliverables:**
- Infrastructure setup
  - Web hosting: Vercel (Next.js), AWS, or Google Cloud
  - Database hosting: Firebase, Supabase, or managed PostgreSQL
  - CDN: Cloudflare or AWS CloudFront
  - Email/SMS service: SendGrid, Twilio (for optional notifications)
- CI/CD pipeline
  - GitHub Actions or GitLab CI
  - Automated tests on every push
  - Automatic deployment on main branch merge
  - Rollback capability
- Environment management
  - Development, staging, production environments
  - Environment variables for secrets (API keys, database URLs)
  - Version control (git branching strategy)
- Monitoring & alerting
  - Uptime monitoring (Pingdom, UptimeRobot)
  - Error tracking (Sentry, Rollbar)
  - Performance monitoring (New Relic, DataDog)
  - Log aggregation (CloudWatch, ELK stack)
- Backup & disaster recovery
  - Daily database backups
  - Disaster recovery plan (< 4-hour recovery time objective)
- Domain & SSL
  - Domain: furnitects.com (or whatever the client owns)
  - SSL/TLS certificate (Let's Encrypt or managed)
  - DNS configuration

**Technology Stack:**
- Version Control: GitHub or GitLab
- CI/CD: GitHub Actions, GitLab CI, or Jenkins
- Hosting: Vercel, AWS, Google Cloud, or DigitalOcean
- Monitoring: Sentry, New Relic, or DataDog
- Backup: AWS S3, Google Cloud Storage, or database-native backup

**Success Metrics:**
- Deployment frequency: Daily (minimum) or on-demand
- Mean time to recovery (MTTR): < 30 minutes
- Uptime: 99.5%+
- Zero data loss incidents

---

## Workflow & Dependencies

### Phase 1: Planning & Design (Week 1)
- **Design Agent** → Define color palette, typography, component library
- **Content Agent** → Draft copy, define messaging hierarchy, SEO strategy
- **Frontend Agent** → Create wireframes/mockups based on design

### Phase 2: Development (Weeks 2–4)
- **Frontend Agent** → Build React components, implement quote calculator UI
- **Backend Agent** → Develop quote calculation API, price sheet logic
- **Integration Agent** → Set up Firebase/database, WhatsApp link generation
- **DevOps Agent** → Set up CI/CD pipeline, staging environment

### Phase 3: Integration & Testing (Week 5)
- **QA Agent** → Execute test plan, identify bugs
- **Frontend + Backend Agents** → Fix bugs, optimize performance
- **Integration Agent** → Test WhatsApp flow end-to-end
- **DevOps Agent** → Final infrastructure checks

### Phase 4: Launch & Monitoring (Week 6+)
- **DevOps Agent** → Deploy to production, set up monitoring
- **QA Agent** → Smoke testing in production
- **All Agents** → Monitor for issues, iterate based on user feedback

### Dependencies
```
Design System → Frontend Development
Content → Landing Page & SEO
Backend API → Frontend Integration
Database → Backend & Quote Storage
WhatsApp Integration → Quote Confirmation Flow
CI/CD Pipeline → Automated Deployment
Monitoring → Production Stability
```

---

## Communication & Handoff

### Frontend ↔ Backend
- **Contract:** Quote calculation API endpoint
  - Request: `POST /api/quotes` with design type, dimensions, customization
  - Response: Quote object with price breakdown, unique ID, expiration
  - Error responses: Validation errors, server errors (with proper codes)
- **Data Format:** JSON (ISO 8601 for timestamps, numeric units in standard ranges)

### Backend ↔ Integration
- **Contract:** Quote persistence & WhatsApp message generation
  - Backend stores quote in database
  - Integration agent retrieves quote by ID
  - Integration generates WhatsApp link with pre-filled message
  - Frontend receives WhatsApp link to render button

### Frontend ↔ Design
- **Handoff:** Design system file (Figma/Sketch) with components, colors, typography
- **Implementation:** Frontend builds components per design system

### All ↔ QA
- **Testing Requirements:** Feature complete checklist, acceptance criteria
- **QA Reports:** Bug tracker (GitHub Issues, Jira, Asana) with severity levels

---

## Success Criteria & KPIs

### Business Metrics
- **Quote Calculator Completion Rate:** > 35% of visitors who start
- **WhatsApp Conversion:** > 40% of completed quotes lead to WhatsApp click
- **Cost Per Quote:** Track to ensure ROI positive
- **Repeat Client Rate:** > 20% of clients return for additional orders (6-month measure)

### Technical Metrics
- **Uptime:** 99.5%+ (max 3.6 hours downtime per month)
- **Page Load Time:** < 3 seconds on 4G
- **API Response Time:** Quote endpoint < 1 second
- **Lighthouse Score:** > 90 (all categories)
- **Bug Escape Rate:** < 5% (issues found post-launch)

### User Experience Metrics
- **Mobile Responsiveness:** 0 layout issues across breakpoints
- **Accessibility:** 0 WCAG AA violations
- **Form Completion Time:** Average < 3 minutes (quote calculator)
- **Error Rate:** < 2% of form submissions fail validation

### Content Metrics
- **Organic Search Traffic:** 500+ monthly sessions (6-month target)
- **Meta Tag Coverage:** 100% of pages optimized
- **CTA Click-Through Rate:** > 15%
- **FAQ Engagement:** > 25% of visitors click FAQ

---

## Tools & Resources

### Design & Prototyping
- Figma, Adobe XD, or Sketch
- UI Kit: Material Design, Tailwind UI, or custom component library

### Development
- VS Code, WebStorm, or equivalent IDE
- Node.js, Python, or Go runtime
- Git & GitHub/GitLab
- Docker (optional: for local dev consistency)

### Testing
- Jest, Vitest, or Mocha (unit tests)
- Cypress or Playwright (E2E tests)
- Lighthouse CI
- axe DevTools, WAVE (accessibility)

### Monitoring & Analytics
- Google Analytics 4
- Sentry or Rollbar (error tracking)
- New Relic or DataDog (performance)
- Uptime Robot or Pingdom (uptime monitoring)

### Communication
- Slack or Discord (team chat)
- GitHub Issues or Jira (task tracking)
- Weekly sync meetings (Monday 10am IST suggested)

---

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Quote calculation bugs | High | Automated tests (unit + E2E), manual QA, staged rollout |
| WhatsApp API changes | Medium | Maintain docs, monitor Twilio/Meta changelog, fallback: manual link |
| Mobile responsiveness issues | Medium | Test on 10+ real devices, use responsive frameworks (Tailwind) |
| Database downtime | High | Backups (daily), disaster recovery plan, failover setup |
| Security vulnerabilities | High | OWASP scanning, regular security audits, input validation |
| Performance degradation | Medium | Lighthouse CI, performance budgets, CDN caching |
| Team coordination delays | Medium | Clear handoffs, synchronous design reviews, daily standup |

---

## Rollout & Go-Live Checklist

- [ ] All design system components finalized
- [ ] Frontend builds all pages without errors
- [ ] Backend quote API tested (unit + E2E)
- [ ] Database backups configured & tested
- [ ] WhatsApp integration tested end-to-end
- [ ] CI/CD pipeline fully automated
- [ ] Staging environment matches production
- [ ] Full QA test suite passes (100% of tests)
- [ ] Lighthouse score > 90 (all pages)
- [ ] WCAG AA audit passes (0 violations)
- [ ] Security scan passes (no critical vulnerabilities)
- [ ] Analytics & conversion tracking configured
- [ ] Monitoring & alerting live
- [ ] Disaster recovery plan documented & tested
- [ ] Team trained on production support
- [ ] Client sign-off on design & functionality
- [ ] Go-live date confirmed with team
- [ ] Post-launch support plan finalized

---

## Post-Launch Support

**Week 1:** Daily checkins, monitor error rates, user feedback
**Month 1:** Weekly performance reviews, iterate on CTA copy (A/B test), optimize images
**Months 2–6:** Monthly performance reviews, expand content (blog, FAQs), scale infrastructure if needed
**Months 6+:** Quarterly business review, plan feature additions (custom design upload, client dashboard, payment integration)

---

## Contact & Ownership

| Role | Owner | Contact |
|------|-------|---------|
| **Project Lead** | [Your Name] | [Email/Slack] |
| **Frontend Lead** | Frontend Agent | [Repo/Docs] |
| **Backend Lead** | Backend Agent | [Repo/API Docs] |
| **Design Lead** | Design Agent | [Figma Link] |
| **QA Lead** | QA Agent | [Test Plan Link] |
| **DevOps Lead** | DevOps Agent | [Infrastructure Docs] |
| **Client** | Yash Bagmar, Furnitects | +91 98819 84488, support@furnitects.com |

---

**Document Version:** 1.0  
**Last Updated:** June 2026  
**Next Review:** Post-launch + 30 days
