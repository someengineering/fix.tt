export interface AttioPersonResponse {
  data: {
    id: {
      object_id: string;
      record_id: string;
      workspace_id: string;
    };
    values: {
      name?: AttioNameValue[];
      company?: AttioCompanyValue[];
      twitter?: AttioTextValue[];
      facebook?: AttioTextValue[];
      linkedin?: AttioTextValue[];
      angellist?: AttioTextValue[];
      instagram?: AttioTextValue[];
      job_title?: AttioTextValue[];
      avatar_url?: AttioTextValue[];
      description?: AttioTextValue[];
      phone_numbers?: AttioPhoneNumberValue[];
      email_addresses?: AttioEmailAddressValue[];
      primary_location?: AttioLocationValue[];
      twitter_follower_count?: AttioNumberValue[];
    };
    created_at: string;
  };
}

interface AttioActor {
  id: string;
  type: 'api-token' | 'workspace-member' | 'system';
}

interface AttioValue {
  active_from: string;
  active_until?: string;
  attribute_type: string;
  created_by_actor: AttioActor;
}

interface AttioTextValue extends AttioValue {
  value: string;
  attribute_type: 'text';
  created_by_actor: AttioActor;
}

interface AttioNumberValue extends AttioValue {
  value: number;
  attribute_type: 'number';
  created_by_actor: AttioActor;
}

interface AttioNameValue extends AttioValue {
  full_name: string;
  last_name: string;
  first_name: string;
  attribute_type: 'personal-name';
  created_by_actor: AttioActor;
}

interface AttioCompanyValue extends AttioValue {
  target_object: string;
  attribute_type: 'record-reference';
  created_by_actor: AttioActor;
  target_record_id: string;
}

interface AttioPhoneNumberValue extends AttioValue {
  country_code:
    | 'AF'
    | 'AX'
    | 'AL'
    | 'DZ'
    | 'AS'
    | 'AD'
    | 'AO'
    | 'AI'
    | 'AQ'
    | 'AG'
    | 'AR'
    | 'AM'
    | 'AW'
    | 'AU'
    | 'AT'
    | 'AZ'
    | 'BS'
    | 'BH'
    | 'BD'
    | 'BB'
    | 'BY'
    | 'BE'
    | 'BZ'
    | 'BJ'
    | 'BM'
    | 'BT'
    | 'BO'
    | 'BA'
    | 'BW'
    | 'BV'
    | 'BR'
    | 'IO'
    | 'BN'
    | 'BG'
    | 'BF'
    | 'BI'
    | 'KH'
    | 'CM'
    | 'CA'
    | 'CV'
    | 'KY'
    | 'CF'
    | 'TD'
    | 'CL'
    | 'CN'
    | 'CX'
    | 'CC'
    | 'CO'
    | 'KM'
    | 'CG'
    | 'CD'
    | 'CK'
    | 'CR'
    | 'CI'
    | 'HR'
    | 'CU'
    | 'CY'
    | 'CZ'
    | 'DK'
    | 'DJ'
    | 'DM'
    | 'DO'
    | 'EC'
    | 'EG'
    | 'SV'
    | 'GQ'
    | 'ER'
    | 'EE'
    | 'ET'
    | 'FK'
    | 'FO'
    | 'FJ'
    | 'FI'
    | 'FR'
    | 'GF'
    | 'PF'
    | 'TF'
    | 'GA'
    | 'GM'
    | 'GE'
    | 'DE'
    | 'GH'
    | 'GI'
    | 'GR'
    | 'GL'
    | 'GD'
    | 'GP'
    | 'GU'
    | 'GT'
    | 'GG'
    | 'GN'
    | 'GW'
    | 'GY'
    | 'HT'
    | 'HM'
    | 'VA'
    | 'HN'
    | 'HK'
    | 'HU'
    | 'IS'
    | 'IN'
    | 'ID'
    | 'IR'
    | 'IQ'
    | 'IE'
    | 'IM'
    | 'IL'
    | 'IT'
    | 'JM'
    | 'JP'
    | 'JE'
    | 'JO'
    | 'KZ'
    | 'KE'
    | 'KI'
    | 'KR'
    | 'KW'
    | 'KG'
    | 'LA'
    | 'LV'
    | 'LB'
    | 'LS'
    | 'LR'
    | 'LY'
    | 'LI'
    | 'LT'
    | 'LU'
    | 'MO'
    | 'MK'
    | 'MG'
    | 'MW'
    | 'MY'
    | 'MV'
    | 'ML'
    | 'MT'
    | 'MH'
    | 'MQ'
    | 'MR'
    | 'MU'
    | 'YT'
    | 'MX'
    | 'FM'
    | 'MD'
    | 'MC'
    | 'MN'
    | 'ME'
    | 'MS'
    | 'MA'
    | 'MZ'
    | 'MM'
    | 'NA'
    | 'NR'
    | 'NP'
    | 'NL'
    | 'AN'
    | 'NC'
    | 'NZ'
    | 'NI'
    | 'NE'
    | 'NG'
    | 'NU'
    | 'NF'
    | 'MP'
    | 'NO'
    | 'OM'
    | 'PK'
    | 'PW'
    | 'PS'
    | 'PA'
    | 'PG'
    | 'PY'
    | 'PE'
    | 'PH'
    | 'PN'
    | 'PL'
    | 'PT'
    | 'PR'
    | 'QA'
    | 'RE'
    | 'RO'
    | 'RU'
    | 'RW'
    | 'BL'
    | 'SH'
    | 'KN'
    | 'LC'
    | 'MF'
    | 'PM'
    | 'VC'
    | 'WS'
    | 'SM'
    | 'ST'
    | 'SA'
    | 'SN'
    | 'RS'
    | 'SC'
    | 'SL'
    | 'SG'
    | 'SK'
    | 'SI'
    | 'SB'
    | 'SO'
    | 'ZA'
    | 'GS'
    | 'ES'
    | 'LK'
    | 'SD'
    | 'SR'
    | 'SJ'
    | 'SZ'
    | 'SE'
    | 'CH'
    | 'SY'
    | 'TW'
    | 'TJ'
    | 'TZ'
    | 'TH'
    | 'TL'
    | 'TG'
    | 'TK'
    | 'TO'
    | 'TT'
    | 'TN'
    | 'TR'
    | 'TM'
    | 'TC'
    | 'TV'
    | 'UG'
    | 'UA'
    | 'AE'
    | 'GB'
    | 'US'
    | 'UM'
    | 'UY'
    | 'UZ'
    | 'VU'
    | 'VE'
    | 'VN'
    | 'VG'
    | 'VI'
    | 'WF'
    | 'EH'
    | 'YE'
    | 'ZM'
    | 'ZW';
  phone_number: string;
  attribute_type: 'phone-number';
  original_phone_number: string;
}

interface AttioEmailAddressValue extends AttioValue {
  email_domain: string;
  email_address: string;
  attribute_type: 'email-address';
  email_root_domain: string;
  email_local_specifier: string;
  original_email_address: string;
}

interface AttioLocationValue extends AttioValue {
  line_1?: string;
  line_2?: string;
  line_3?: string;
  line_4?: string;
  region?: string;
  latitude?: number;
  locality?: string;
  postcode?: string;
  longitude?: number;
  country_code?: string;
  attribute_type: 'location';
}
