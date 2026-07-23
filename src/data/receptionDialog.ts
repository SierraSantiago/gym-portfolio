export type ReceptionTopicId =
  | 'place'
  | 'explore'
  | 'projects'
  | 'tour'

export interface ReceptionDialogOption {
  id: ReceptionTopicId
  label: string
  response: string
}

export const receptionistName = 'Maya'

export const receptionGreeting =
  "Welcome to Santiago's interactive gym portfolio. How can I help you get started?"

export const receptionDialogOptions: ReceptionDialogOption[] = [
  {
    id: 'place',
    label: 'What is this place?',
    response:
      "This is Santiago Sierra's interactive gym portfolio. The gym represents his professional journey, and the space is designed so you can discover his work by exploring it instead of reading a traditional portfolio page.",
  },
  {
    id: 'explore',
    label: 'How do I explore?',
    response:
      'Walk through the gym and approach the highlighted machines. Each project station has an interaction marker. Use it to open the information connected to that machine, then continue through the room at your own pace.',
  },
  {
    id: 'projects',
    label: 'Tell me about the projects',
    response:
      "Each selected machine contains one of the projects Santiago has completed. I will not explain the individual projects here—the complete description, technologies, challenges, and results are available directly at each machine.",
  },
  {
    id: 'tour',
    label: 'Start tour',
    response:
      'Tour started. Follow the yellow interaction markers and visit the project machines one by one. The nearest highlighted station is a good place to begin.',
  },
]
