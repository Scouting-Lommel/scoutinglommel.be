import { generateApiQuery } from '@/lib/api';
import {
  CREATE_ACTIVITY_MUTATION,
  DELETE_ACTIVITY_MUTATION,
  UPDATE_ACTIVITY_MUTATION,
} from './mutations';
import { GET_ACTIVITIES_QUERY } from './queries';

export const getActivities = (slug: string, date: string): Promise<any> => {
  return generateApiQuery({
    variables: { slug: slug, currDate: date },
    query: GET_ACTIVITIES_QUERY,
  });
};

export function createActivity({
  title,
  startDate,
  startTime,
  endDate,
  endTime,
  description,
  groupDocumentId,
}: {
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  description: string;
  groupDocumentId: string;
}): Promise<any> {
  return generateApiQuery({
    variables: { title, startDate, startTime, endDate, endTime, description, groupDocumentId },
    query: CREATE_ACTIVITY_MUTATION,
    operation: 'mutation',
  });
}

export function updateActivity({
  documentId,
  title,
  startDate,
  startTime,
  endDate,
  endTime,
  description,
}: {
  documentId: string;
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  description: string;
}): Promise<any> {
  return generateApiQuery({
    variables: { documentId, title, startDate, startTime, endDate, endTime, description },
    query: UPDATE_ACTIVITY_MUTATION,
    operation: 'mutation',
  });
}

export function deleteActivity(documentId: string): Promise<any> {
  return generateApiQuery({
    variables: { documentId },
    query: DELETE_ACTIVITY_MUTATION,
    operation: 'mutation',
  });
}
