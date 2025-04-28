export enum EvidenceCategory {
    CLINICAL_EVIDENCE = 'Clinical Evidence',
    POPULATION_EVIDENCE = 'Population Evidence',
    MOLECULAR_IMPACT_EVIDENCE = 'Molecular Impact Evidence',
}
export enum ClinicalEvidence {
    CLN_CCR = 'Case:control ratio',
    CLN_COB = 'Case observation counts',
    CLN_LNK = 'Linkage',
    CLN_PHE = 'Specific Phenotype',
    CLN_DNV = 'De novo',
    CLN_CTG = 'Cis and trans genotypes',
}

export enum PopulationEvidence {
    POP_FRQ = 'Population Freq.',
}

export enum MolecularImpactEvidence {
    IMP_LOF = 'Loss of function variants',
    IMP_NSM = 'Missense variants',
    IMP_SYN = 'Synonymous',
    IMP_INF = 'In-frame delins',
    IMP_SPL = 'Splicing assessment',
    IMP_FXN = 'Variant-specific Funct Assays',
}

export type EvidenceType =
    | ClinicalEvidence
    | PopulationEvidence
    | MolecularImpactEvidence

export const data = []

enum EvidencePointScale {
    INDETERMINATE = 0,
    SUPPORTING = 1,
    MODERATE = 2,
    STRONG = 4,
    VERY_STRONG = 8,
}
export const EvidenceWeightOptions = [
    {
        label: 'Indeterminate',
        value: EvidencePointScale.INDETERMINATE,
    },
    {
        label: 'Supporting',
        value: EvidencePointScale.SUPPORTING,
    },
    {
        label: 'Moderate',
        value: EvidencePointScale.MODERATE,
    },
    {
        label: 'Strong',
        value: EvidencePointScale.STRONG,
    },
    {
        label: 'Very Strong',
        value: EvidencePointScale.VERY_STRONG,
    },
]
