import 'server-only';

import { ATTIO_ACCESS_TOKEN, ATTIO_USER_LIST_ID } from '@/constants/attio';

async function assertPersonRecord(
  email: string,
): Promise<{ recordId: string }> {
  const attioResponse = await fetch(
    'https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses',
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${ATTIO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: { values: { email_addresses: [{ email_address: email }] } },
      }),
    },
  );

  if (attioResponse.ok) {
    return { recordId: (await attioResponse.json()).data.id.record_id };
  }

  throw new Error('Failed to assert Attio person record');
}

async function assertListEntry({
  listId,
  entryValues,
  parentObject,
  parentRecordId,
}: {
  listId: string;
  entryValues: { [slug: string]: string };
  parentObject: string;
  parentRecordId: string;
}): Promise<void> {
  const attioResponse = await fetch(
    `https://api.attio.com/v2/lists/${listId}/entries`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ATTIO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          entry_values: entryValues,
          parent_object: parentObject,
          parent_record_id: parentRecordId,
        },
      }),
    },
  );

  if (attioResponse.ok) {
    return;
  }

  throw new Error('Failed to create Attio list entry');
}

export async function addPerson(email: string): Promise<void> {
  const { recordId } = await assertPersonRecord(email);

  await assertListEntry({
    listId: ATTIO_USER_LIST_ID!,
    entryValues: {},
    parentObject: 'people',
    parentRecordId: recordId,
  });
}
