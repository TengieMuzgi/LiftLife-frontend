export type TrainingSession = {
  documentId: string;
  exercises: Array<ExerciseId>;
  finishHour: number;
  startHour: number;
  name: string;
  template: boolean;
};

export type TrainingPlanShort = {
  documentId: string;
  name: string;
  clientId: string;
  coachId: string;
};

export type TrainingDay = {
  documentId: string;
  trainingSessions: Array<TrainingSession>;
};

export type ExerciseId = string;

export type SessionMutationData = {
  type: 'add' | 'remove';
  newSession?: Omit<TrainingSession, 'documentId'>;
  dayId?: string;
  sessionId?: string;
};
