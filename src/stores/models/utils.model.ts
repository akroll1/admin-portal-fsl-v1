export interface ChatMessage {
    action?: 'SEND_MESSAGE'
    Attributes?: Record<keyof ContentType, string>
    body?: string
    Content: ContentType
    heading?: string
    id?: string
    requestId?: string
    state?: boolean
}

export enum ContentType {
    CALLING_IT = "CALLING_IT",
    FSL = "FSL",
    GROUP = "GROUP",
    PANELIST = "PANELIST",
    ROUND_SCORES = "ROUND_SCORES",
}

export interface Modals {
    addMemberModal: boolean
    addGuestJudgeModal: boolean
    expiredTokenModal: boolean
    fightReviewFormModal: boolean
    moneylineModal: boolean
    predictionModal: boolean
}

export const resetModals = {
    addMemberModal: false,
    addGuestJudgeModal: false,
    expiredTokenModal: false,
    fightReviewFormModal: false,
    moneylineModal: false,
    predictionModal: false,
}

export interface Toast {
    title?: string
    description?: string
    duration?: number
    isClosable?: boolean
    status?: string
    variant?: string
}

export const resetToast = {
    title: '',
    description: '',
    duration: 5000,
    isClosable: true,
    status: '',
    variant: '',
}