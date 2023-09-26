export interface LcTrxResponse {
  applicantBank: string;
  applicant: string;
  formOfDocumentaryCredit: FormOfDocumentaryCredit;
  beneficiaryBank: string;
  beneficiary: string;
  dateOfIssue: string;
  applicableRules: string;
  expiryDate: string;
  expiryPlace: string;
  currencyCode: string;
  amount: number;
  percentageCreditAmountTolerancePlus: number;
  percentageCreditAmountToleranceMinus: number;
  additionalAmountsCovered: string;
  availableWithByCode: AvailableWithByCode;
  draftsAt: string;
}

export interface FormOfDocumentaryCredit {
  form: "IRREVOCABLE" | "IRREVOCABLE TRANSFERABLE";
}

export interface AvailableWithByCode {
  code: "BY ACCEPTANCE" | "BY DEF PAYMENT" | "BY MIXED PYMT" | "BY NEGOTIATION" | "BY PAYMENT";
}