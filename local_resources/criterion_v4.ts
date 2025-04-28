import {
    ClinicalEvidence,
    EvidenceCategory,
    MolecularImpactEvidence,
    PopulationEvidence,
} from './acmg-criteria-v4'

export const criterion_v4 = [
    {
        id: '1',
        evidenceCategory: EvidenceCategory.CLINICAL_EVIDENCE,
        evidenceType: ClinicalEvidence,
        evidenceCodes: [
            {
                id: '1',
                code: 'CLN_CCR',
                label: 'Case-control ratio',
                definition: `Case-control ratio`,
            },
            {
                id: '2',
                code: 'CLN_COB',
                label: 'Case observation counts',
                definition: `Case observation counts`,
            },
            {
                id: '3',
                code: 'CLN_LNK',
                label: 'Linkage',
                definition: `Linkage`,
            },
            {
                id: '4',
                code: 'CLN_PHE',
                label: 'specific phenotype',
                definition: `specific phenotype`,
            },
            {
                id: '5',
                code: 'CLN_DNV',
                label: 'de novo',
                definition: `de novo data`,
            },
            {
                id: '6',
                code: 'CLN_CTG',
                label: 'Cis and trans genotypes',
                definition: 'Cis and trans genotypes',
            },
        ],
    },
    {
        id: '2',
        evidenceCategory: EvidenceCategory.POPULATION_EVIDENCE,
        evidenceType: PopulationEvidence,

        evidenceCodes: [
            {
                id: '1',
                code: 'POP_FRQ',
                label: 'Population frequency',
                definition: `Allele frequency of variant under assessment compared to
calculated disease allele frequency (DAF) threshold in the general population`,
            },
        ],
    },
    {
        id: '3',
        evidenceCategory: EvidenceCategory.MOLECULAR_IMPACT_EVIDENCE,
        evidenceType: MolecularImpactEvidence,
        evidenceCodes: [
            {
                id: '1',
                code: 'IMP_LOF',
                label: 'Loss of function variants',
                definition: `Loss of function variants are those that are predicted to
                `,
            },
            {
                id: '2',
                code: 'IMP_NSM',
                label: 'Missense variants',
                definition: `Missense variants`,
            },

            {
                id: '3',
                code: 'IMP_SVN',
                label: 'Synonymous variants',
                definition: `Synonymous variants`,
            },
            {
                id: '4',
                code: 'IMP_INF',
                label: 'Inframe delins',
                definition: `Inframe delins`,
            },
            {
                id: '5',
                code: 'IMP_SPL',
                label: 'Splice assessment',
                definition: `Splice assessment`,
            },
            {
                id: '6',
                code: 'IMP_FXN',
                label: 'Variant-specific functional evidence',
                definition: `Variant-specific functional evidence`,
            },
        ],
    },
]

export type EvidenceCode = {
    id: string
    code: string
    label: string
    definition?: string
}

export type Criterion_v4 = {
    id: string
    evidenceCategory: EvidenceCategory
    evidenceType:
        | ClinicalEvidence
        | PopulationEvidence
        | MolecularImpactEvidence
    evidenceCodes: {
        id: string
        code: string
        label: string
        definition?: string
    }[]
}
