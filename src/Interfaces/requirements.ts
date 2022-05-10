/** Core Requirements */
export type CoreReqs = [
    "CISC 108",
    "CISC 181",
    "CISC 210",
    "CISC 220",
    "CISC 260",
    "CISC 275",
    "CISC 303",
    "CISC 320",
    "MATH 210",
    "MATH 241"
];

export type AIReqs = [
    "CISC 304",
    "CISC 442",
    "CISC 481",
    "CISC 483",
    "CISC 484"
];

export type BioinformaticsReqs = [
    "BISC 207",
    "BISC 208",
    "BISC 401",
    "CHEM 103",
    "CHEM 133",
    "CHEM 104",
    "CHEM 134",
    "CISC 372",
    "CISC 436",
    "MATH 242",
    "MATH 349"
];

export type CybersecurityReqs = [
    "CISC 361",
    "CISC 372",
    "CISC 450",
    "CISC 464",
    "CPEG 465",
    "CPEG 494"
];

export type DataScienceReqs = [
    "CISC 304",
    "CISC 372",
    "CISC 437",
    "CISC 481",
    "MATH 205",
    "MATH 242",
    "MATH 243",
    "MATH 349"
];

export type HighPerformanceComputingReqs = [
    "CISC 360",
    "CISC 361",
    "CISC 372",
    "CISC 450",
    "CISC 471",
    "MATH 242",
    "MATH 243"
];

export type SystemsandNetworksReqs = [
    "CISC 360",
    "CISC 361",
    "CISC 372",
    "CISC 450",
    "CISC 471"
];

export type TheoryandComputationReqs = [
    "CISC 304",
    "CISC 401",
    "MATH 242",
    "MATH 349"
];

export interface Concentration {
    Core: CoreReqs;
    AI: AIReqs;
    Bioinformatics: BioinformaticsReqs;
    Cybersecurity: CybersecurityReqs;
    DataScience: DataScienceReqs;
    HighPerformanceComputing: HighPerformanceComputingReqs;
    SystemsandNetworks: SystemsandNetworksReqs;
    TheoryandComputation: TheoryandComputationReqs;
}
