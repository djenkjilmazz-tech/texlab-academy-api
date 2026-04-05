type Sample = {
  id: number;
  customer: string;
  fabricType: string;
  tests: string[];
  results?: any;
};

let samples: Sample[] = [];
let currentId = 1;

export function createSample(data: any) {
  const sample: Sample = {
    id: currentId++,
    customer: data.customer,
    fabricType: data.fabricType,
    tests: data.tests
  };
  samples.push(sample);
  return sample;
}

export function getSamples() {
  return samples;
}

export function addResults(id: number, results: any) {
  const sample = samples.find(s => s.id === id);
  if (!sample) return null;
  sample.results = results;
  return sample;
}

export function generateReport(id: number) {
  const sample = samples.find(s => s.id === id);
  if (!sample) return null;

  return {
    sampleId: sample.id,
    customer: sample.customer,
    fabric: sample.fabricType,
    tests: sample.tests,
    results: sample.results,
    conclusion: "PASS"
  };
}