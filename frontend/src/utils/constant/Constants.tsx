export const debounceTimeInMilliSeconds = 500;

export const dateFormat = 'DD-MM-YYYY | h:mm A';
export const cookieExpiresInDays = 1;
export const initialPaginationConfig = {
  filter: null,
  search: '',
  limit: 10,
  page: 1,
};

export const cookieKeys = {
  token: 'TOKEN',
  secretKey: 'ADMIN',
  initialKey: 'CENTRAL',
};

export enum envType {
  DEVELOPMENT = 'DEVELOPMENT',
  STAGING = 'STAGING',
  PRODUCTION = 'PRODUCTION',
}

export const rejectionReasons = [
  'Name in the Photo ID and the Name in edeXa account do not match',
  'Date of birth in the Photo id and the Date of birth in the kyc form does not match',
  'Country of issuing authority of the Photo ID is different from the nationality of the applicant',
  'Resolution of the picture is too low to confirm the information',
  'Other',
];

export const suspendUserRejectionReasons = [
  'Violation of Terms of Service ',
  'Violation of Community Guidelines ',
  'Spamming or Phishing ',
  'Violation of Privacy Policies',
  'Harassment or Threats',
  'Fraudulent or Suspicious Activity',
  'Failure to Verify Account Information',
  'Other',
];

export const networkReasons = [
  'Wrong Network Information',
  'Reject Invalid',
  'Already Requested',
  'User Invalid',
  'Other',
];

export enum STATUS_VALUE {
  PENDING = 0,
  APPROVE = 1,
  REJECTED = 2,
  IN_PROGRESS = 3,
}
// ['0', '1', '2', '3', '4', '5','6']
// 0 - pending, 1 - email sent, 2 - rejected // 3- support  4 //node added as observer   // 5 node as validator  // 6 in progress
export enum VALIDATOR_STATUS_VALUE {
  PENDING = '0',
  EMAIL_SENT = '1',
  REJECTED = '2',
  SUPPORT_SYSTEM = '3',
  NODE_OBSERVER = '4',
  NODE_VALIDATOR = '5',
  IN_PROGRESS = '6',
}

export enum STACKING_STATUS_VALUE {
  GENERAL = 0,
  SOLUTION_PARTNERS = 1,
  TECHNOLOGY_PARTNERS = 2,
  EDUCATION_PARTNERS = 3,
  ENROLL_BUSINESS = 4,
  BOUNTY_BUGS = 5,
}

export const validationMessages = {
  appName: {
    required: 'Name is required',
    min: 'Please enter minimum 3 characters',
    max: 'Maximum allowed characters are 20',
  },
  onlyAlphabets: 'Please enter aplhabets only',
  onlyNumerical: 'Please enter numerical value',
  firstName: {
    required: 'First name is required',
    invalid: 'Only alphabet are allowed',
    min: 'Minimum 2 characters',
    max: 'Maximum 30 characters',
  },
  lastName: {
    required: 'Last name is required',
    invalid: 'Only alphabet are allowed',
    min: 'Minimum 2 characters',
    max: 'Maximum 30 characters',
  },
  email: {
    required: 'Email is required',
    invalid: 'Invalid Email',
  },
  password: {
    required: 'Password is required',
    matches:
      'Minimum eight and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  },
  regFullName: {
    required: 'Full Name is required',
  },
  termsConditions: {
    required: 'Terms of serive is required',
  },
  formInvalid: 'Please fill required fields',
  invalidFile: 'Please upload only images',
  currentPassword: {
    required: 'Current password is required',
  },
  oldPassword: {
    required: 'Old password is required',
  },
  newPassword: {
    required: 'New password is required',
    notSame: 'Both Password must be match!',
  },
  confirmPassword: {
    required: 'Confirm new password is required',
    requiredConfirm: 'Confirm password is required',
    mustMatch: 'New password and confirm new password mismatched',
    passwordMatch: 'Password and confirm password mismatched',
  },
  onlyCharacters: 'Only alphabets are allowed for this field',
  phone: {
    required: 'Phone number is required',
  },
  otp: {
    required: 'OTP number is required',
  },
  fullname: {
    require: 'Full name is required',
  },
  roleName: {
    required: 'Role name is required',
    min: 'Minimum 3 characters',
    max: 'Maximum 30 characters',
  },
  permission: {
    required: 'Permission name is required',
  },
  groupName: {
    required: 'Group name is required',
    invalid: 'Only alphabet are allowed',
    min: 'Group Name must be at least 3 characters long',
    max: 'Group Name should not exceed 26 characters limit',
  },
  birthDate: { required: 'Birth date is required' },
  pollTitle: {
    required: 'Poll title is required',
    invalid: 'Only alphabet are allowed',
    min: 'Poll title must be at least 3 characters long',
    max: 'Poll title should not exceed 240 characters limit',
  },
  resultDate: {
    required: 'Result date is required',
  },
  voteStartDate: {
    required: 'Voting start date is required',
  },
  voteEndDate: {
    required: 'Voting end date is required',
  },
  publishedDate: {
    required: 'Published date is required',
  },
  content: {
    required: 'Content is required',
    min: 'Please enter minimum 3 characters',
  },
  group: {
    required: 'At least one group has to be selected',
    labelRequired: 'Label is Required',
    valueRequired: 'value is Required',
  },
  templateName: {
    required: 'Template name is required',
    min: 'Minimum 3 characters',
    max: 'Maximum 25 characters',
  },
  templateDescription: {
    required: 'Description is required',
    min: 'Minimum 25 characters',
    max: 'Maximum 100 characters',
  },
  templateType: {
    required: 'Template type is required',
    min: 'Minimum 3 characters',
    max: 'Maximum 25 characters',
  },
  title: {
    required: 'Title is required',
  },
  placeholder: {
    required: 'Placeholder is required',
  },
  key: {
    required: 'Key is required',
  },
  default: {
    required: 'Default Value is required',
  },
  type: {
    required: 'Type Value is required',
  },
  code: {
    required: 'Coupon Code is required',
  },
  discount: {
    min: 'The minimum value should be greater then 0',
    max: 'The maximum value should be lesser then 100',
    required: 'Discount is required',
  },
  expirationDate: { required: 'Expiration Date is required' },
  price: {
    required: 'Price is required',
    min: 'Price must be greater than or equal to 1',
  },
  compulsory: {
    required: 'Please select any one',
  },
  totalStamps: {
    required: 'Total Stamps is required',
  },
  minDiscount: {
    required: 'Minimum Discount is required',
  },
  minStamps: {
    required: 'Minimum Stamps is required',
  },
  maxStamps: {
    required: 'Maximum Stamps is required',
  },
  domain: { required: 'Domain name is required' },
  region: { required: 'Region name is required' },
  file: { required: 'Upload File is required' },
  name: {
    required: 'Name is required',
    min: 'Please enter minimum 3 characters',
    max: 'Please enter maximum 60 characters',
  },
  subtitle: {
    required: 'Subtitle is required',
    min: 'Please enter minimum 3 characters',
    max: 'Please enter maximum 100 characters',
  },
  categoryName: {
    required: 'Category Name is required',
  },
  description: {
    required: 'Description is required',
    max: 'Maximum allowed characters are 10000',
  },
  shortDescription: { required: 'Description is required' },
  appId: { required: 'App Id is required' },
  appModuleName: { required: 'App Name is required' },
  moduleName: {
    required: 'Module Name is required',
    management: 'Module name must contain "management"',
  },
  appUrl: { required: 'APP URL must be a valid URL' },
  desktopUrl: { required: 'Desktop URL must be a valid URL' },
  iosUrl: { required: 'IOS URL must be a valid URL' },
  extensionUrl: { required: 'Extension URL must be a valid URL' },
  logoIcon: {
    required: 'Logo Icon is Required',
    big: 'Big Logo Icon is Required',
    small: 'Small Logo Icon is Required',
  },
  imageUrl: { required: 'Image is required' },
  features: { required: 'Feature is Required' },
  ErrorDescription: { required: 'Error Description is Required' },
  ErrorTypes: { required: 'Error Type is Required' },
  request_type: { required: 'Request Type is Required' },
  url: { required: 'URL is Required' },
  liveUrl: { required: 'Live URL must be a valid URL' },
  status: { required: 'Status is Required' },
  endpoint: { required: 'Endpoint is Required' },
  value: { required: 'Value is Required' },
  important: { required: 'Message is Required' },
  notes: { required: 'Notes is Required' },
  tips: { required: 'Tips is Required' },
  info: { required: 'Info is Required' },
  categoryId: { required: 'Category is Required' },
  trendingAppLimit: { required: 'Trending App Limit is Required' },
  trendingAppPrecedence: {
    required: 'Trending App Precedence is Required',
  },
  HTTPstatus: {
    status_code: 'Status Code is Required',
    message: 'Message is Required',
  },
  actions: { required: 'Permissions is required' },
  redirectionUrl: {
    required: 'Redirection Url is required',
    proper: 'Enter Proper Redirection Url',
  },
  userName: {
    required: 'User name is required',
    invalid: 'Only alphabet are allowed',
    min: 'Minimum 2 characters',
    max: 'Maximum 30 characters',
  },
  tags: {
    required: 'Tags is required',
    min: 'Please enter minimum 1 Tag',
    max: 'Maximum 10 Tags are allowed',
  },
  pricingPlan: {
    required: 'Pricing Plan name is required',
    max: 'Pricing Plan name is not allowed more then 20 characters.',
  },
  contracts: {
    required: 'Contracts is required',
    min: 'Contracts value must be greater than or equal to 1',
  },
  signatory: {
    required: 'Signatory is required',
    min: 'Signatory value must be greater than or equal to 1',
  },
  storage: {
    required: 'Storage is required',
    min: 'Storage must be greater than or equal to 1',
  },
  publicFiles: {
    required: 'Public Files is required',
    min: 'Public Files value must be greater than or equal to 1',
  },
};

// name of all the admin panel projects
export const project = {
  admin: 'admin',
  banji: 'banji',
  bmessage: 'bmessage',
  bstamp: 'bstamp',
  btrack: 'btrack',
  bvote: 'bvote',
  byou: 'byou',
  edexanetwork: 'edexanetwork',
  nft: 'bnft',
  universe: 'universe',
  bsign: 'bsign',
};

// Project Modules name constant
export const projectModules = {
  [project.admin]: {
    ADMIN_MANAGEMENT: 'adminmanagement',
    DASHBOARD: 'dashboardmanagement',
    ERROR_MANAGEMENT: 'errormanagement',
    GLOBAL_SETTINGS: 'settingmanagement',
    KYC_MANAGEMENT: 'kycmanagement',
    MODULE_MANAGEMENT: 'modulemanagement',
    ROLE_MANAGEMENT: 'rolemanagement',
    SHORTCUT_MANAGEMENT: 'shortcutmanagement',
    USER_MANAGEMENT: 'usermanagement',
  },
  [project.banji]: {
    DASHBOARD: 'dashboardmanagement',
    COUPON_MANAGEMENT: 'couponmanagement',
    CUSTOMER_PLAN_REQUEST: 'requestmanagement',
    DIGITAL_TWIN: 'dtwinmanagement',
    LABEL_MANAGEMENT: 'labelmanagement',
    NEWS: 'newsmanagement',
    NOTIFICATION: 'notificationmanagement',
    PLAN_MANAGEMENT: 'planmanagement',
    GLOBAL_SETTINGS: 'settingmanagement',
  },
  [project.edexanetwork]: {
    DASHBOARD: 'dashboardmanagement',
    AVAILABLEAPPSMANAGEMENT: 'availappmanagement',
    CONTACTUSMANAGEMENT: 'contactusmanagement',
    DAPPSMANAGEMENT: 'reqappmanagement',
    MARKETPLACEMANAGEMENT: 'mrktplcmanagement',
    VALIDATORMANAGEMENT: 'validatormanagement',
    GLOBAL_SETTINGS: 'settingmanagement',
    LABEL_MANAGEMENT: 'labelmanagement',
    DEMO_REQUEST: 'reqdemomanagement',
    BLOG_MANAGEMENT: 'blogmanagement',
  },
  [project.bvote]: {
    DASHBOARD: 'dashboardmanagement',
    REQUEST_DEMO: 'reqdemomanagement',
    POLL: 'pollmanagement',
    MANAGE_VOTERS: 'votermanagement',
    MANAGE_GROUPS: 'groupmanagement',
    POLL_HISTORY: 'pollhistorymanagement',
    GLOBAL_SETTINGS: 'settingmanagement',
  },
  [project.bmessage]: {
    DASHBOARD: 'dashboardmanagement',
    PRICE_AND_PLAN: 'planmanagement',
    LABEL_MANAGEMENT: 'labelmanagement',
    GLOBAL_SETTINGS: 'settingmanagement',
  },
  [project.nft]: {
    BLOCK_CHAIN: 'blockchainmanagement',
    CATEGORY_MANAGEMENT: 'categorymanagement',
    COUPON_MANAGEMENT: 'couponmanagement',
    DASHBOARD: 'dashboardmanagement',
    GLOBAL_SETTINGS: 'settingmanagement',
    LABEL_MANAGEMENT: 'labelmanagement',
    NFT_MANAGEMENT: 'nftmanagement',
    PLAN_MANAGEMENT: 'planmanagement',
    REQUEST_DEMO: 'reqdemomanagement',
  },
  [project.bstamp]: {
    DASHBOARD: 'dashboardmanagement',
    LABEL_MANAGEMENT: 'labelmanagement',
    GLOBAL_SETTINGS: 'settingmanagement',
    PLAN_MANAGEMENT: 'planmanagement',
    COUPON_MANAGEMENT: 'couponmanagement',
  },
  [project.byou]: {
    USER_MANAGEMENT: 'usermanagement',
    GLOBAL_SETTINGS: 'settingmanagement',
    LABEL_MANAGEMENT: 'labelmanagement',
  },
  [project.universe]: {
    DASHBOARD: 'dashboardmanagement',
    UNIVERSAL_MANAGEMENT: 'universemanagement',
    SMART_CONTRACTS: 'contractmanagement',
    API_MANAGEMENT: 'apimanagement',
    APPLICATION_MANAGEMENT: 'applicationmanagement',
    CHAIN_CODE_MANAGEMENT: 'chaincodemanagement',
    CHANNEL_MANAGEMENT: 'channelmanagement',
    CHANNEL_INVITATION: 'channelmanagement',
    PEER_MANAGEMENT: 'peermanagement',
    REQUEST_HISTORY: 'reqhistorymanagement',
    TEMPLATE_LISTING: 'templatemanagement',
    MANAGE_DOMAINS: 'networkmanagement',
    MANAGE_REGIONS: 'networkmanagement',
    GLOBAL_SETTINGS: 'settingmanagement',
  },
  [project.btrack]: {
    DASHBOARD: 'dashboardmanagement',
    LABEL_MANAGEMENT: 'labelmanagement',
    ISSUE_MANAGEMENT: 'issuemanagement',
    GLOBAL_SETTINGS: 'settingmanagement',
  },
  [project.bsign]: {
    COUPON_MANAGEMENT: 'couponmanagement',
    PLAN_MANAGEMENT: 'planmanagement',
    LABEL_MANAGEMENT: 'labelmanagement',
    GLOBAL_SETTINGS: 'settingmanagement',
  },
};

export interface IPaginationConfig {
  page: number;
  limit: number;
  filter?: string | number | null;
  search?: string | null;
}

export const nftbanRejectionReasons = [
  'Copyright Violation',
  'Low Image Quality',
  'Inappropriate Language or Descriptions',
  'Unoriginal or Duplicate Content',
  'Fake Content',
  'Nude Content',
  'Other',
];

export const RequestDemoStatusLabel = {
  InProgress: {
    name: 'InProgress',
    no: 0,
  },
  Declined: {
    name: 'Declined',
    no: 1,
  },
  Scheduled: {
    name: 'Demo Scheduled',
    no: 2,
  },
  Completed: { name: 'Demo is Completed', no: 3 },
  Approved: { name: 'Assigned NFT Access', no: 4 },
};

export const UniverseFilterStatusOptions = [
  { value: 'All', label: 'All' },
  { value: 0, label: 'Pending' },
  { value: 1, label: 'Approved' },
  { value: 2, label: 'Rejected' },
  { value: 3, label: 'In Progress' },
];
