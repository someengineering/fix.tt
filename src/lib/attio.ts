import 'server-only';

import { ATTIO_API_KEY } from '@/constants/attio';

export async function assertPersonRecord(
  email: string,
): Promise<{ record_id: string }> {
  const attioResponse = await fetch(
    'https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses',
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${ATTIO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: { values: { email_addresses: [{ email_address: email }] } },
      }),
    },
  );

  if (attioResponse.ok) {
    return { record_id: (await attioResponse.json()).data.id.record_id };
  }

  throw new Error('Failed to assert Attio person record');
}

export async function createListEntry({
  list_id,
  entry_values,
  parent_object,
  parent_record_id,
}: {
  list_id: string;
  entry_values: { [attribute: string]: { [slug: string]: string }[] };
  parent_object: string;
  parent_record_id: string;
}): Promise<void> {
  const attioResponse = await fetch(
    `https://api.attio.com/v2/lists/${list_id}/entries`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ATTIO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          entry_values,
          parent_object,
          parent_record_id,
        },
      }),
    },
  );

  if (attioResponse.ok) {
    return;
  }

  throw new Error('Failed to create Attio list entry');
}
