# TexLab 17025 Textile Lab OS

Open-source MVP for **textile testing laboratories** aligned with **TS EN ISO/IEC 17025:2017**.

This repository is designed as the foundation for three connected layers:

1. **Laboratory operations** – sample intake, test methods, reports, calibration reminders
2. **Quality system support** – document control, nonconformities, internal audit checklist, competence tracking
3. **Academy integration** – training, quizzes, certificates, and future machine + method learning flows

## Vision

Most textile labs still manage accreditation readiness with scattered Excel files, PDFs, email chains, and manual follow-up. This project aims to provide a practical digital backbone for:

- textile physical and color fastness laboratories
- quality managers preparing for ISO/IEC 17025 audits
- training organizations that want to teach test methods and quality system basics
- equipment suppliers that want to pair machines with method education

## MVP Scope

### Included in this first version
- Express + TypeScript API starter
- health endpoint
- ISO 17025 clause checklist endpoint
- example textile test method catalog endpoint
- project structure ready for PostgreSQL and auth integration

### Planned modules
- sample registration
- test request workflow
- report generator
- calibration and maintenance tracker
- uncertainty calculator
- staff competence matrix
- CAPA / nonconformity workflow
- document revision control
- training + exam + certificate engine

## Suggested Repository Roadmap

### Phase 1 – Core API
- [x] repo bootstrap
- [x] basic TypeScript server
- [x] checklist endpoint
- [x] textile methods seed data
- [ ] PostgreSQL models
- [ ] JWT authentication
- [ ] role-based permissions

### Phase 2 – Lab Operations
- [ ] customer and sample intake
- [ ] test plan builder
- [ ] result entry
- [ ] PDF/HTML report rendering
- [ ] equipment registry

### Phase 3 – 17025 Quality Layer
- [ ] document control
- [ ] internal audit scheduler
- [ ] corrective action system
- [ ] risk and opportunity register
- [ ] supplier evaluation records

### Phase 4 – Academy Layer
- [ ] course catalog
- [ ] quiz engine
- [ ] certificate generation
- [ ] integration with texlabinstruments.com and academy.texlabinstruments.com

## Example API Endpoints

- `GET /health`
- `GET /api/checklists/iso17025`
- `GET /api/methods/textile`

## Quick Start

```bash
npm install
npm run dev
```

Then open:

- `http://localhost:3000/health`
- `http://localhost:3000/api/checklists/iso17025`
- `http://localhost:3000/api/methods/textile`

## Initial Textile Method Focus

The starter dataset currently points to common textile laboratory themes:

- color fastness
- pH testing
- dimensional stability
- tensile and tear strength
- crocking / rubbing fastness
- absorbency / wetting related controls

## Important Note

This project is **not** an official ISO standard publication and does **not** reproduce proprietary standard text. It is a management and training support framework inspired by public clause themes and practical lab workflow needs.

## Recommended Next Build

1. Add PostgreSQL with Prisma
2. Add authentication and roles
3. Build sample + job card module
4. Build PDF report export
5. Connect training records to competence tracking

## License

MIT
