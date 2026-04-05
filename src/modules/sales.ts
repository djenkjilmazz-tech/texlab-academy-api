const deviceMap: any = {
  "pH": {
    device: "TexLab pH Core Device",
    message: "Minutes instead of hours. Cost advantage."
  },
  "Color Fastness": {
    device: "TexLab Fastness Tester",
    message: "High efficiency vs competitors"
  }
};

export function suggestDevice(tests: string[]) {
  return tests.map(test => {
    return deviceMap[test] || {
      device: "TexLab General Equipment",
      message: "Contact TexLab"
    };
  });
}