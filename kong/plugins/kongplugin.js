class KongPlugin {
  constructor(config) {
    this.config = config;
  }

  async certificate(kong) {
    await kong.log.notice("RUNNING certificatte()");
  }

  async rewrite(kong) {
    await kong.log.notice("RUNNING rewrite()");
  }

  async access(kong) {
    await kong.log.notice("RUNNING access()");
    /**Does not work for logging */

    /**Works for logging */
    await kong.log.notice("-----THIS IS INSIDE KONG access() method-------");

    /**Works for setting headers in the response */
    await kong.response.set_header("x-bero-header", "working bero");
    await kong.response.set_header("x-hello-header", "HELLO bero");

    /**Works - interrupts current processing and sends a new respone */
    // await kong.response.exit(200, "Works like a charm!!!")

    await kong.log.notice("========================");

    const requestBody = await kong.request.get_raw_body();

    await kong.log.notice("Logging the request body");
    await kong.log.notice(requestBody);
    await kong.log.notice("========================");


    /**Correct data */
    const data = generateIsoMessageFromRest({
      type: "NETWORK_MANAGEMENT_REQUEST",
      dataFields: {
        "Date and time transmission": "1013135825",
        "Systems trace audit number": "005825",
        "Time local transaction": "015825",
        "Date local transaction": "1013",
        "Network management information code": "301",
      },
    });

    /**Incorrect data */
    // const data = generateIsoMessageFromRest({
    //   type: "NETWORK_MANAGEMENT_REQUEST",
    //   dataFields: {
    //     "Date and time transmission": "101313582",
    //     "Systems trace audit number": "005825",
    //     "Time local transaction": "015825",
    //     "Date local transaction": "1013",
    //     "Network management information code": "301",
    //   },
    // });

    await kong.log.notice("---Parsed ISO Value below---");
    await kong.log.notice(data);

  }

  async response(kong) {
    await kong.log.notice("RUNNING response()");
  }

  async preread(kong) {
    await kong.log.notice("RUNNING preread()");
  }

  async log(kong) {
    await kong.log.notice("RUNNING log()");
  }
}

const bit_to_field = {
  // '1': {
  //   name: 'Bitmap Indicator',
  //   format: '',
  //   representation: 'b 64',
  //   bit: '1',
  // },
  2: {
    name: "Primary account number (PAN)",
    format: "LLVAR",
    representation: "n ..19",
    bit: "2",
  },
  3: {
    name: "Processing code",
    format: "",
    representation: "n 6",
    bit: "3",
  },
  4: {
    name: "Amount transaction",
    format: "",
    representation: "n 12",
    bit: "4",
  },
  5: {
    name: "Amount settlement",
    format: "",
    representation: "n 12",
    bit: "5",
  },
  6: {
    name: "Amount cardholder billing",
    format: "",
    representation: "n 12",
    bit: "6",
  },
  7: {
    name: "Date and time transmission",
    format: "MMDDhhmmss",
    representation: "n 10",
    bit: "7",
  },
  8: {
    name: "Amount cardholder billing fee",
    format: "",
    representation: "n 8",
    bit: "8",
  },
  9: {
    name: "Conversion rate settlement",
    format: "",
    representation: "n 8",
    bit: "9",
  },
  10: {
    name: "Conversion rate cardholder billing",
    format: "",
    representation: "n 8",
    bit: "10",
  },
  11: {
    name: "Systems trace audit number",
    format: "",
    representation: "n 6",
    bit: "11",
  },
  12: {
    name: "Time local transaction",
    format: "hhmmss",
    representation: "n 6",
    bit: "12",
  },
  13: {
    name: "Date local transaction",
    format: "MMDD",
    representation: "n 4",
    bit: "13",
  },
  14: {
    name: "Date expiration",
    format: "YYMM",
    representation: "n 4",
    bit: "14",
  },
  15: {
    name: "Date settlement",
    format: "MMDD",
    representation: "n 4",
    bit: "15",
  },
  16: {
    name: "Date conversion",
    format: "MMDD",
    representation: "n 4",
    bit: "16",
  },
  17: {
    name: "Date capture",
    format: "MMDD",
    representation: "n 4",
    bit: "17",
  },
  18: {
    name: "Merchant type",
    format: "",
    representation: "n 4",
    bit: "18",
  },
  19: {
    name: "Acquiring institution country code",
    format: "",
    representation: "n 3",
    bit: "19",
  },
  20: {
    name: "Primary account number (PAN) extended country code",
    format: "",
    representation: "n 3",
    bit: "20",
  },
  21: {
    name: "Forwarding institution country code",
    format: "",
    representation: "n 3",
    bit: "21",
  },
  22: {
    name: "Point of service entry mode",
    format: "",
    representation: "n 3",
    bit: "22",
  },
  23: {
    name: "Card sequence number",
    format: "",
    representation: "n 3",
    bit: "23",
  },
  24: {
    name: "Function code",
    format: "",
    representation: "n 3",
    bit: "24",
  },
  25: {
    name: "Point of service condition code",
    format: "",
    representation: "n 2",
    bit: "25",
  },
  26: {
    name: "Point of service capture code",
    format: "",
    representation: "n 2",
    bit: "26",
  },
  27: {
    name: "Authorisation identification response length",
    format: "",
    representation: "n 1",
    bit: "27",
  },
  28: {
    name: "Amount transaction fee",
    format: "",
    representation: "n 8",
    bit: "28",
  },
  29: {
    name: "Amount settlement fee",
    format: "",
    representation: "n 8",
    bit: "29",
  },
  30: {
    name: "Amount transaction processing fee",
    format: "",
    representation: "n 8",
    bit: "30",
  },
  31: {
    name: "Amount settlement processing fee",
    format: "",
    representation: "n 8",
    bit: "31",
  },
  32: {
    name: "Acquiring institution identification code",
    format: "LLVAR",
    representation: "n ..11",
    bit: "32",
  },
  33: {
    name: "Forwarding institution identification code",
    format: "LLVAR",
    representation: "n ..11",
    bit: "33",
  },
  34: {
    name: "Primary account number extended",
    format: "LLVAR",
    representation: "n ..28",
    bit: "34",
  },
  35: {
    name: "Track 2 data",
    format: "LLVAR",
    representation: "z ..37",
    bit: "35",
  },
  36: {
    name: "Track 3 data",
    format: "LLLVAR",
    representation: "z ..104",
    bit: "36",
  },
  37: {
    name: "Retrieval reference number",
    format: "",
    representation: "an 12",
    bit: "37",
  },
  38: {
    name: "Authorization identification response",
    format: "",
    representation: "an 6",
    bit: "38",
  },
  39: {
    name: "Response code",
    format: "",
    representation: "an 2",
    bit: "39",
  },
  40: {
    name: "Service restriction code",
    format: "",
    representation: "an 3",
    bit: "40",
  },
  41: {
    name: "Card acceptor terminal identification",
    format: "",
    representation: "ans 16",
    bit: "41",
  },
  42: {
    name: "Card acceptor identification code",
    format: "",
    representation: "ans 15",
    bit: "42",
  },
  43: {
    name: "Card acceptor name/location",
    format: "",
    representation: "ans 40",
    bit: "43",
  },
  44: {
    name: "Additional response data",
    format: "LLVAR",
    representation: "an ..25",
    bit: "44",
  },
  45: {
    name: "Track 1 data",
    format: "LLVAR",
    representation: "an ..76",
    bit: "45",
  },
  46: {
    name: "Additional data ISO",
    format: "LLLVAR",
    representation: "an ..999",
    bit: "46",
  },
  47: {
    name: "Additional data national",
    format: "LLLVAR",
    representation: "an ..999",
    bit: "47",
  },
  48: {
    name: "Additional data private",
    format: "LLLVAR",
    representation: "an ..999",
    bit: "48",
  },
  49: {
    name: "Currency code transaction",
    format: "",
    representation: "an 3",
    bit: "49",
  },
  50: {
    name: "Currency code settlement",
    format: "",
    representation: "an 3",
    bit: "50",
  },
  51: {
    name: "Currency code card holder billing",
    format: "",
    representation: "a 3",
    bit: "51",
  },
  52: {
    name: "Personal identification number (PIN) data",
    format: "",
    representation: "b 16",
    bit: "52",
  },
  53: {
    name: "Security related control information",
    format: "",
    representation: "n 18",
    bit: "53",
  },
  54: {
    name: "Additional amounts",
    format: "LLLVAR",
    representation: "an ..120",
    bit: "54",
  },
  64: {
    name: "Message authentication code (MAC) field",
    format: "",
    representation: "b 16",
    bit: "64",
  },
  65: {
    name: "Reserved for ISO use",
    format: "",
    representation: "",
    bit: "65",
  },
  66: {
    name: "Settlement code",
    format: "",
    representation: "n 1",
    bit: "66",
  },
  67: {
    name: "Extended payment code",
    format: "",
    representation: "n 2",
    bit: "67",
  },
  68: {
    name: "Receiving institution country code",
    format: "",
    representation: "n 3",
    bit: "68",
  },
  69: {
    name: "Settlement institution country code",
    format: "",
    representation: "n 3",
    bit: "69",
  },
  70: {
    name: "Network management information code",
    format: "",
    representation: "n 3",
    bit: "70",
  },
  71: {
    name: "Message number",
    format: "",
    representation: "n 4",
    bit: "71",
  },
  72: {
    name: "Data record",
    format: "LLLVAR",
    representation: "ans ..999",
    bit: "72",
  },
  73: {
    name: "Date action",
    format: "YYMMDD",
    representation: "n 6",
    bit: "73",
  },
  74: {
    name: "Credits number",
    format: "",
    representation: "n 10",
    bit: "74",
  },
  75: {
    name: "Credits reversal number",
    format: "",
    representation: "n 10",
    bit: "75",
  },
  76: {
    name: "Debits number",
    format: "",
    representation: "n 10",
    bit: "76",
  },
  77: {
    name: "Debits reversal number",
    format: "",
    representation: "n 10",
    bit: "77",
  },
  78: {
    name: "Transfer number",
    format: "",
    representation: "n 10",
    bit: "78",
  },
  79: {
    name: "Transfer reversal number",
    format: "",
    representation: "n 10",
    bit: "79",
  },
  80: {
    name: "Inquiries number",
    format: "",
    representation: "n 10",
    bit: "80",
  },
  81: {
    name: "Authorisations number",
    format: "",
    representation: "n 10",
    bit: "81",
  },
  82: {
    name: "Credits processing fee amount",
    format: "",
    representation: "n 12",
    bit: "82",
  },
  83: {
    name: "Credits transaction fee amount",
    format: "",
    representation: "n 12",
    bit: "83",
  },
  84: {
    name: "Debits processing fee amount",
    format: "",
    representation: "n 12",
    bit: "84",
  },
  85: {
    name: "Debits transaction fee amount",
    format: "",
    representation: "n 12",
    bit: "85",
  },
  86: {
    name: "Credits amount",
    format: "",
    representation: "n 15",
    bit: "86",
  },
  87: {
    name: "Credits reversal amount",
    format: "",
    representation: "n 15",
    bit: "87",
  },
  88: {
    name: "Debits amount",
    format: "",
    representation: "n 15",
    bit: "88",
  },
  89: {
    name: "Debits reversal amount",
    format: "",
    representation: "n 15",
    bit: "89",
  },
  90: {
    name: "Original data elements",
    format: "",
    representation: "n 42",
    bit: "90",
  },
  91: {
    name: "File update code",
    format: "",
    representation: "an 1",
    bit: "91",
  },
  92: {
    name: "File security code",
    format: "",
    representation: "n 2",
    bit: "92",
  },
  93: {
    name: "Response indicator",
    format: "",
    representation: "n 5",
    bit: "93",
  },
  94: {
    name: "Service indicator",
    format: "",
    representation: "an 7",
    bit: "94",
  },
  95: {
    name: "Replacement amounts",
    format: "",
    representation: "an 42",
    bit: "95",
  },
  96: {
    name: "Message security code",
    format: "",
    representation: "an 8",
    bit: "96",
  },
  97: {
    name: "Amount net settlement",
    format: "",
    representation: "n 16",
    bit: "97",
  },
  98: { name: "Payee", format: "", representation: "ans 25", bit: "98" },
  99: {
    name: "Settlement institution identification code",
    format: "LLVAR",
    representation: "n ..11",
    bit: "99",
  },
  100: {
    name: "Receiving institution identification code",
    format: "LLVAR",
    representation: "n ..11",
    bit: "100",
  },
  101: {
    name: "File name",
    format: "LLVAR",
    representation: "ans ..99",
    bit: "101",
  },
  102: {
    name: "Account identification 1",
    format: "LLVAR",
    representation: "ans ..28",
    bit: "102",
  },
  103: {
    name: "Account identification 2",
    format: "LLVAR",
    representation: "ans ..28",
    bit: "103",
  },
  104: {
    name: "Transaction description",
    format: "LLLVAR",
    representation: "ans ..999",
    bit: "104",
  },
  128: {
    name: "Message authentication code (MAC) field",
    format: "",
    representation: "b 16",
    bit: "128",
  },
  "55-56": {
    name: "Reserved for ISO use",
    format: "LLLVAR",
    representation: "ans ..999",
    bit: "55-56",
  },
  "57-59": {
    name: "Reserved for national use",
    format: "LLLVAR",
    representation: "ans ..999",
    bit: "57-59",
  },
  "60-63": {
    name: "Reserved for private use",
    format: "LLLVAR",
    representation: "ans ..999",
    bit: "60-63",
  },
  "105-111": {
    name: "Reserved for ISO use",
    format: "",
    representation: "",
    bit: "105-111",
  },
  "112-119": {
    name: "Reserved for national use",
    format: "",
    representation: "",
    bit: "112-119",
  },
  "120-127": {
    name: "Reserved for private use",
    format: "",
    representation: "",
    bit: "120-127",
  },
};

const field_to_bit = {
  // 'Bitmap Indicator': {
  //   bit: '1',
  //   format: '',
  //   representation: 'b 64',
  //   name: 'Bitmap Indicator',
  // },
  "Primary account number (PAN)": {
    bit: "2",
    format: "LLVAR",
    representation: "n ..19",
    name: "Primary account number (PAN)",
  },
  "Processing code": {
    bit: "3",
    format: "",
    representation: "n 6",
    name: "Processing code",
  },
  "Amount transaction": {
    bit: "4",
    format: "",
    representation: "n 12",
    name: "Amount transaction",
  },
  "Amount settlement": {
    bit: "5",
    format: "",
    representation: "n 12",
    name: "Amount settlement",
  },
  "Amount cardholder billing": {
    bit: "6",
    format: "",
    representation: "n 12",
    name: "Amount cardholder billing",
  },
  "Date and time transmission": {
    bit: "7",
    format: "MMDDhhmmss",
    representation: "n 10",
    name: "Date and time transmission",
  },
  "Amount cardholder billing fee": {
    bit: "8",
    format: "",
    representation: "n 8",
    name: "Amount cardholder billing fee",
  },
  "Conversion rate settlement": {
    bit: "9",
    format: "",
    representation: "n 8",
    name: "Conversion rate settlement",
  },
  "Conversion rate cardholder billing": {
    bit: "10",
    format: "",
    representation: "n 8",
    name: "Conversion rate cardholder billing",
  },
  "Systems trace audit number": {
    bit: "11",
    format: "",
    representation: "n 6",
    name: "Systems trace audit number",
  },
  "Time local transaction": {
    bit: "12",
    format: "hhmmss",
    representation: "n 6",
    name: "Time local transaction",
  },
  "Date local transaction": {
    bit: "13",
    format: "MMDD",
    representation: "n 4",
    name: "Date local transaction",
  },
  "Date expiration": {
    bit: "14",
    format: "YYMM",
    representation: "n 4",
    name: "Date expiration",
  },
  "Date settlement": {
    bit: "15",
    format: "MMDD",
    representation: "n 4",
    name: "Date settlement",
  },
  "Date conversion": {
    bit: "16",
    format: "MMDD",
    representation: "n 4",
    name: "Date conversion",
  },
  "Date capture": {
    bit: "17",
    format: "MMDD",
    representation: "n 4",
    name: "Date capture",
  },
  "Merchant type": {
    bit: "18",
    format: "",
    representation: "n 4",
    name: "Merchant type",
  },
  "Acquiring institution country code": {
    bit: "19",
    format: "",
    representation: "n 3",
    name: "Acquiring institution country code",
  },
  "Primary account number (PAN) extended country code": {
    bit: "20",
    format: "",
    representation: "n 3",
    name: "Primary account number (PAN) extended country code",
  },
  "Forwarding institution country code": {
    bit: "21",
    format: "",
    representation: "n 3",
    name: "Forwarding institution country code",
  },
  "Point of service entry mode": {
    bit: "22",
    format: "",
    representation: "n 3",
    name: "Point of service entry mode",
  },
  "Card sequence number": {
    bit: "23",
    format: "",
    representation: "n 3",
    name: "Card sequence number",
  },
  "Function code": {
    bit: "24",
    format: "",
    representation: "n 3",
    name: "Function code",
  },
  "Point of service condition code": {
    bit: "25",
    format: "",
    representation: "n 2",
    name: "Point of service condition code",
  },
  "Point of service capture code": {
    bit: "26",
    format: "",
    representation: "n 2",
    name: "Point of service capture code",
  },
  "Authorisation identification response length": {
    bit: "27",
    format: "",
    representation: "n 1",
    name: "Authorisation identification response length",
  },
  "Amount transaction fee": {
    bit: "28",
    format: "",
    representation: "n 8",
    name: "Amount transaction fee",
  },
  "Amount settlement fee": {
    bit: "29",
    format: "",
    representation: "n 8",
    name: "Amount settlement fee",
  },
  "Amount transaction processing fee": {
    bit: "30",
    format: "",
    representation: "n 8",
    name: "Amount transaction processing fee",
  },
  "Amount settlement processing fee": {
    bit: "31",
    format: "",
    representation: "n 8",
    name: "Amount settlement processing fee",
  },
  "Acquiring institution identification code": {
    bit: "32",
    format: "LLVAR",
    representation: "n ..11",
    name: "Acquiring institution identification code",
  },
  "Forwarding institution identification code": {
    bit: "33",
    format: "LLVAR",
    representation: "n ..11",
    name: "Forwarding institution identification code",
  },
  "Primary account number extended": {
    bit: "34",
    format: "LLVAR",
    representation: "n ..28",
    name: "Primary account number extended",
  },
  "Track 2 data": {
    bit: "35",
    format: "LLVAR",
    representation: "z ..37",
    name: "Track 2 data",
  },
  "Track 3 data": {
    bit: "36",
    format: "LLLVAR",
    representation: "z ..104",
    name: "Track 3 data",
  },
  "Retrieval reference number": {
    bit: "37",
    format: "",
    representation: "an 12",
    name: "Retrieval reference number",
  },
  "Authorization identification response": {
    bit: "38",
    format: "",
    representation: "an 6",
    name: "Authorization identification response",
  },
  "Response code": {
    bit: "39",
    format: "",
    representation: "an 2",
    name: "Response code",
  },
  "Service restriction code": {
    bit: "40",
    format: "",
    representation: "an 3",
    name: "Service restriction code",
  },
  "Card acceptor terminal identification": {
    bit: "41",
    format: "",
    representation: "ans 16",
    name: "Card acceptor terminal identification",
  },
  "Card acceptor identification code": {
    bit: "42",
    format: "",
    representation: "ans 15",
    name: "Card acceptor identification code",
  },
  "Card acceptor name/location": {
    bit: "43",
    format: "",
    representation: "ans 40",
    name: "Card acceptor name/location",
  },
  "Additional response data": {
    bit: "44",
    format: "LLVAR",
    representation: "an ..25",
    name: "Additional response data",
  },
  "Track 1 data": {
    bit: "45",
    format: "LLVAR",
    representation: "an ..76",
    name: "Track 1 data",
  },
  "Additional data ISO": {
    bit: "46",
    format: "LLLVAR",
    representation: "an ..999",
    name: "Additional data ISO",
  },
  "Additional data national": {
    bit: "47",
    format: "LLLVAR",
    representation: "an ..999",
    name: "Additional data national",
  },
  "Additional data private": {
    bit: "48",
    format: "LLLVAR",
    representation: "an ..999",
    name: "Additional data private",
  },
  "Currency code transaction": {
    bit: "49",
    format: "",
    representation: "an 3",
    name: "Currency code transaction",
  },
  "Currency code settlement": {
    bit: "50",
    format: "",
    representation: "an 3",
    name: "Currency code settlement",
  },
  "Currency code card holder billing": {
    bit: "51",
    format: "",
    representation: "a 3",
    name: "Currency code card holder billing",
  },
  "Personal identification number (PIN) data": {
    bit: "52",
    format: "",
    representation: "b 16",
    name: "Personal identification number (PIN) data",
  },
  "Security related control information": {
    bit: "53",
    format: "",
    representation: "n 18",
    name: "Security related control information",
  },
  "Additional amounts": {
    bit: "54",
    format: "LLLVAR",
    representation: "an ..120",
    name: "Additional amounts",
  },
  "Reserved for ISO use": {
    bit: "105-111",
    format: "",
    representation: "",
    name: "Reserved for ISO use",
  },
  "Reserved for national use": {
    bit: "112-119",
    format: "",
    representation: "",
    name: "Reserved for national use",
  },
  "Reserved for private use": {
    bit: "120-127",
    format: "",
    representation: "",
    name: "Reserved for private use",
  },
  "Message authentication code (MAC) field": {
    bit: "128",
    format: "",
    representation: "b 16",
    name: "Message authentication code (MAC) field",
  },
  "Settlement code": {
    bit: "66",
    format: "",
    representation: "n 1",
    name: "Settlement code",
  },
  "Extended payment code": {
    bit: "67",
    format: "",
    representation: "n 2",
    name: "Extended payment code",
  },
  "Receiving institution country code": {
    bit: "68",
    format: "",
    representation: "n 3",
    name: "Receiving institution country code",
  },
  "Settlement institution country code": {
    bit: "69",
    format: "",
    representation: "n 3",
    name: "Settlement institution country code",
  },
  "Network management information code": {
    bit: "70",
    format: "",
    representation: "n 3",
    name: "Network management information code",
  },
  "Message number": {
    bit: "71",
    format: "",
    representation: "n 4",
    name: "Message number",
  },
  "Data record": {
    bit: "72",
    format: "LLLVAR",
    representation: "ans ..999",
    name: "Data record",
  },
  "Date action": {
    bit: "73",
    format: "YYMMDD",
    representation: "n 6",
    name: "Date action",
  },
  "Credits number": {
    bit: "74",
    format: "",
    representation: "n 10",
    name: "Credits number",
  },
  "Credits reversal number": {
    bit: "75",
    format: "",
    representation: "n 10",
    name: "Credits reversal number",
  },
  "Debits number": {
    bit: "76",
    format: "",
    representation: "n 10",
    name: "Debits number",
  },
  "Debits reversal number": {
    bit: "77",
    format: "",
    representation: "n 10",
    name: "Debits reversal number",
  },
  "Transfer number": {
    bit: "78",
    format: "",
    representation: "n 10",
    name: "Transfer number",
  },
  "Transfer reversal number": {
    bit: "79",
    format: "",
    representation: "n 10",
    name: "Transfer reversal number",
  },
  "Inquiries number": {
    bit: "80",
    format: "",
    representation: "n 10",
    name: "Inquiries number",
  },
  "Authorisations number": {
    bit: "81",
    format: "",
    representation: "n 10",
    name: "Authorisations number",
  },
  "Credits processing fee amount": {
    bit: "82",
    format: "",
    representation: "n 12",
    name: "Credits processing fee amount",
  },
  "Credits transaction fee amount": {
    bit: "83",
    format: "",
    representation: "n 12",
    name: "Credits transaction fee amount",
  },
  "Debits processing fee amount": {
    bit: "84",
    format: "",
    representation: "n 12",
    name: "Debits processing fee amount",
  },
  "Debits transaction fee amount": {
    bit: "85",
    format: "",
    representation: "n 12",
    name: "Debits transaction fee amount",
  },
  "Credits amount": {
    bit: "86",
    format: "",
    representation: "n 15",
    name: "Credits amount",
  },
  "Credits reversal amount": {
    bit: "87",
    format: "",
    representation: "n 15",
    name: "Credits reversal amount",
  },
  "Debits amount": {
    bit: "88",
    format: "",
    representation: "n 15",
    name: "Debits amount",
  },
  "Debits reversal amount": {
    bit: "89",
    format: "",
    representation: "n 15",
    name: "Debits reversal amount",
  },
  "Original data elements": {
    bit: "90",
    format: "",
    representation: "n 42",
    name: "Original data elements",
  },
  "File update code": {
    bit: "91",
    format: "",
    representation: "an 1",
    name: "File update code",
  },
  "File security code": {
    bit: "92",
    format: "",
    representation: "n 2",
    name: "File security code",
  },
  "Response indicator": {
    bit: "93",
    format: "",
    representation: "n 5",
    name: "Response indicator",
  },
  "Service indicator": {
    bit: "94",
    format: "",
    representation: "an 7",
    name: "Service indicator",
  },
  "Replacement amounts": {
    bit: "95",
    format: "",
    representation: "an 42",
    name: "Replacement amounts",
  },
  "Message security code": {
    bit: "96",
    format: "",
    representation: "an 8",
    name: "Message security code",
  },
  "Amount net settlement": {
    bit: "97",
    format: "",
    representation: "n 16",
    name: "Amount net settlement",
  },
  Payee: { bit: "98", format: "", representation: "ans 25", name: "Payee" },
  "Settlement institution identification code": {
    bit: "99",
    format: "LLVAR",
    representation: "n ..11",
    name: "Settlement institution identification code",
  },
  "Receiving institution identification code": {
    bit: "100",
    format: "LLVAR",
    representation: "n ..11",
    name: "Receiving institution identification code",
  },
  "File name": {
    bit: "101",
    format: "LLVAR",
    representation: "ans ..99",
    name: "File name",
  },
  "Account identification 1": {
    bit: "102",
    format: "LLVAR",
    representation: "ans ..28",
    name: "Account identification 1",
  },
  "Account identification 2": {
    bit: "103",
    format: "LLVAR",
    representation: "ans ..28",
    name: "Account identification 2",
  },
  "Transaction description": {
    bit: "104",
    format: "LLLVAR",
    representation: "ans ..999",
    name: "Transaction description",
  },
};

const lookup = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  a: "1010",
  b: "1011",
  c: "1100",
  d: "1101",
  e: "1110",
  f: "1111",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};

const MTINameToBit = {
  AUTHORIZATION_REQUEST: "0100",
  AUTHORIZATION_RESPONSE: "0110",
  AUTHORIZATION_ADVICE: "0120",
  AUTHORIZATION_ADVICE_REPEAT: "0121",
  ISSUER_RESPONSE_TO_AUTHORIZATION_ADVICE: "0130",
  ACQUIRER_FINANCIAL_REQUEST: "0200",
  ISSUER_RESPONSE_TO_FINANCIAL_REQUEST: "0210",
  ACQUIRER_FINANCIAL_ADVICE: "0220",
  ACQUIRER_FINANCIAL_ADVICE_REPEAT: "0221",
  CONFIRMATION_OF_RECEIPT_OF_FINANCIAL_ADVICE: "0230",
  BATCH_UPLOAD: "0320",
  BATCH_UPLOAD_RESPONSE: "0330",
  ACQUIRER_REVERSAL_REQUEST: "0400",
  ACQUIRER_REVERSAL_ADVICE: "0420",
  ACQUIRER_REVERSAL_ADVICE_RESPONSE: "0430",
  BATCH_SETTLEMENT_RESPONSE: "0510",
  NETWORK_MANAGEMENT_REQUEST: "0800",
  NETWORK_MANAGEMENT_RESPONSE: "0810",
  NETWORK_MANAGEMENT_ADVICE: "0820",
};

const MTIBitToName = {
  "0100": "AUTHORIZATION_REQUEST",
  "0110": "AUTHORIZATION_RESPONSE",
  "0120": "AUTHORIZATION_ADVICE",
  "0121": "AUTHORIZATION_ADVICE_REPEAT",
  "0130": "ISSUER_RESPONSE_TO_AUTHORIZATION_ADVICE",
  "0200": "ACQUIRER_FINANCIAL_REQUEST",
  "0210": "ISSUER_RESPONSE_TO_FINANCIAL_REQUEST",
  "0220": "ACQUIRER_FINANCIAL_ADVICE",
  "0221": "ACQUIRER_FINANCIAL_ADVICE_REPEAT",
  "0230": "CONFIRMATION_OF_RECEIPT_OF_FINANCIAL_ADVICE",
  "0320": "BATCH_UPLOAD",
  "0330": "BATCH_UPLOAD_RESPONSE",
  "0400": "ACQUIRER_REVERSAL_REQUEST",
  "0420": "ACQUIRER_REVERSAL_ADVICE",
  "0430": "ACQUIRER_REVERSAL_ADVICE_RESPONSE",
  "0510": "BATCH_SETTLEMENT_RESPONSE",
  "0800": "NETWORK_MANAGEMENT_REQUEST",
  "0810": "NETWORK_MANAGEMENT_RESPONSE",
  "0820": "NETWORK_MANAGEMENT_ADVICE",
};

/**Add bitmap fields here as new APIs are added */
const MtiToBitmap = {
  "0800": "82380000000000000400000000000000",
};

/**Takes in a hexadecimal character string and returns its binary in string */

const hexToBinary = (s) => {
  let returnString = "";
  for (let i = 0, len = s.length; i < len; i++) {
    returnString += lookup[s[i]];
  }
  return returnString;
};

class Helper {
  parseBitmap(primaryBitmap, secondaryBitmap) {
    let bitmap = "";
    if (this.isSecondaryBitmapPresent(primaryBitmap)) {
      bitmap = primaryBitmap + secondaryBitmap;
    } else {
      bitmap = primaryBitmap;
    }

    const binaryBitmap = this.hexBitmapToBinary(bitmap);

    const dataIdsRequired = this.findDataFieldsFromBitmap(binaryBitmap);

    const dataFieldNamesRequired =
      this.getDataFieldNamesFromDataIds(dataIdsRequired);

    return { dataFieldNamesRequired, dataIdsRequired, binaryBitmap };
  }

  isSecondaryBitmapPresent(primaryBitmap) {
    const binary = hexToBinary(primaryBitmap[0]);
    console.log(binary, binary[0], typeof binary[0]);
    if (binary[0] === "1") return true;
    return false;
  }

  findDataFieldsFromBitmap(binaryBitmap) {
    const fieldsArray = [];

    /**
     * Start the index from 1 since the first position indicates the presence of
     * secondary bitmap, which is being cached in memory and not being send by the
     * user
     */
    for (let index = 1; index < binaryBitmap.length; ++index) {
      if (binaryBitmap[index] === "1") fieldsArray.push(index + 1);
    }
    return fieldsArray;
  }

  hexBitmapToBinary(bitmap) {
    let binary = "";

    for (const hexBit of bitmap) {
      binary = binary + hexToBinary(hexBit);
    }

    return binary;
  }

  getDataFieldNamesFromDataIds(dataIds) {
    const dataFieldNames = [];
    dataIds.map((item) => {
      dataFieldNames.push(bit_to_field[item]);
    });

    return dataFieldNames;
  }

  sendIsoMessage(restBody) {
    // console.log('Request body : ', restBody);
    const { type, dataFields } = restBody;
    // console.log('Data fields in rest body : ', dataFields);

    /**Check if the body received is correct or not */
    this.checkRestBody(restBody);

    /**Generate ISO based on the fields */
    const mti = MTINameToBit[type];

    const bitmap = MtiToBitmap[mti];

    const primaryBitmap = bitmap.substring(0, 16);
    const secondaryBitmap = bitmap.substring(16);

    const { dataFieldNamesRequired, dataIdsRequired, binaryBitmap } =
      this.parseBitmap(primaryBitmap, secondaryBitmap);

    let isoMessage = "";

    /**Add MTI information to iso message */
    isoMessage = isoMessage + mti + primaryBitmap + secondaryBitmap;
    // console.log('ISO MESSAGE MTI and BITMAP : ', isoMessage);

    /**Append rest of the data fields in the order they should appear*/
    dataFieldNamesRequired.map((item) => {
      isoMessage = isoMessage + dataFields[item.name];
    });

    // console.log('COMPLETE ISO MESSAGE : ', isoMessage);
    return isoMessage;
  }

  checkRestBody(restBody) {
    const { type, dataFields } = restBody;
    if (!(type in MTINameToBit)) throw new Error("Invalid type passed");

    const mti = MTINameToBit[type];
    // console.log('MTI received : ', mti);

    if (!(mti in MtiToBitmap))
      throw new Error(`Bitmap for ${type} not defined`);

    const bitmap = MtiToBitmap[mti];

    const primaryBitmap = bitmap.substring(0, 16);
    const secondaryBitmap = bitmap.substring(16);

    /**Get the required data fields names */
    const { dataFieldNamesRequired, dataIdsRequired, binaryBitmap } =
      this.parseBitmap(primaryBitmap, secondaryBitmap);

    /**Match the data field names with those present in the rest body */
    console.log({ dataFieldNamesRequired });

    dataFieldNamesRequired.map((item) => {
      /**Check if field name required is present */
      if (!(item.name in dataFields))
        throw new Error(`"${item.name}" data field is missing`);

      /**Check if field type value is in correct format */
      this.isoFieldChecker(
        dataFields[item.name],
        item.name,
        item.format,
        item.representation
      );

      /**@TODO - Check if any extra data field is not present */
    });
  }

  isoFieldChecker(value, fieldName, format, representation) {
    /**@TODO - Check representation */
    //Checking representation
    const representationData = representation.split(" ");
    const representationType = representationData[0];
    let characterLimit = 0;
    let isVariableLength = false;
    if (representation[1].startsWith(".")) {
      isVariableLength = true;
      characterLimit = Number(representation[1].slice(2));
    } else {
      characterLimit = Number(representationData[1]);
    }

    console.log({ characterLimit, isVariableLength, representationType });
    console.log({ value, format, representation });

    /**Check if value.length is according to the ISO format length */
    if (!isVariableLength) {
      if (characterLimit !== value.length)
        throw new Error(
          `Length of "${value}" in "${fieldName}" should be equal to ${characterLimit}`
        );
    } else {
      if (value.length > characterLimit || value.length < 1) {
        throw new Error(
          `Length of "${value}" in "${fieldName}" must be within 1 and ${characterLimit}`
        );
      }
    }

    /**Check if the datatype of value matches the ISO 8583 format */
    switch (representationType) {
      case "n": //Numeric values only
        if (!/^\d+$/.test(value)) {
          throw new Error(`${value} should only contain numbers`);
        }
        break;
      case "b": //Binary data
        if (!/^[0-1]{1,}$/.test(value)) {
          throw new Error(`${value} should only contain binary values`);
        }
        break;
      case "a": //Alpha, including blanks
        if (!/^[A-Za-z]+$/.test(value)) {
          throw new Error(`${value} should only contain binary values`);
        }
        break;
      // case 'an': //alphanumeric
      //   if (!//.test(value)) {
      //     throw new Error(
      //       `${value} should only contain alphanumeric values`,
      //     );
      //   }
      //   break;
      // case 's': //special characters only
      //   if (!//.test(value)) {
      //     throw new Error(
      //       `${value} should only contain special characters only`,
      //     );
      //   }
      //   break;
      // case 'as': //alpha and special characters only
      //   if (!//.test(value)) {
      //     throw new Error(
      //       `${value} should only contain alpha and special characters`,
      //     );
      //   }
      //   break;
      // case 'ns': //numeric and special characters only
      //   if (!//.test(value)) {
      //     throw new Error(
      //       `${value} should only contain numeric and special characters`,
      //     );
      //   }
      //   break;
      // case 'ans': //alphabetic, numeric and special characters
      //   if (!//.test(value)) {
      //     throw new Error(
      //       `${value} should only contain alphabetic numeric and special characters`,
      //     );
      //   }
      //   break;
      // case 'z': //TO BE STUDIED
      //   break;
      default:
        throw new Error(
          `Value ${value} has invalid data format. It must follow the ISO8583 format "${representation}"`
        );
    }

    const INVALID_FORMAT_ERROR_MESSAGE = `Invalid value passed "${value}" for field "${fieldName}"`;

    /**Check format */
    switch (format) {
      case "YYMMDD": {
        if (
          !/([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])/.test(value)
        ) {
          throw new Error(INVALID_FORMAT_ERROR_MESSAGE);
        }
        break;
      }

      case "MMDDhhmmss": {
        /**@TODO : Check for month which does not have that date. e.g. 30 February */
        if (
          !/(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])(2[0-3]|[01][0-9])([0-5][0-9])([0-5][0-9])/.test(
            value
          )
        ) {
          throw new Error(INVALID_FORMAT_ERROR_MESSAGE);
        }
        break;
      }
      case "hhmmss": {
        if (!/(2[0-3]|[01][0-9])([0-5][0-9])([0-5][0-9])/.test(value)) {
          throw new Error(INVALID_FORMAT_ERROR_MESSAGE);
        }
        break;
      }

      case "YYMM": {
        if (!/([0-9]{2})(0[1-9]|1[0-2])/.test(value)) {
          throw new Error(INVALID_FORMAT_ERROR_MESSAGE);
        }
        break;
      }

      case "MMDD": {
        if (!/(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])/.test(value)) {
          throw new Error(INVALID_FORMAT_ERROR_MESSAGE);
        }
        break;
      }

      case "LLVAR":
        break;
      case "LLLVAR":
        break;
      default:
        break;
    }
  }
}

// // const helper = new Helper();

// // const data = helper.sendIsoMessage({
// //   type: "NETWORK_MANAGEMENT_REQUEST",
// //   dataFields: {
// //     "Date and time transmission": "1013135825",
// //     "Systems trace audit number": "005825",
// //     "Time local transaction": "015825",
// //     "Date local transaction": "1013",
// //     "Network management information code": "301",
// //   },
// // });

// // console.log("----------DATA BEROS-----------", data);

function generateIsoMessageFromRest(restBody) {
  const helper = new Helper();
  return helper.sendIsoMessage(restBody);
}

module.exports = {
  Plugin: KongPlugin,
  Version: "0.1.0",
};
