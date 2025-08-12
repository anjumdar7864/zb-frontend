import { DetailsNavigate, OrderNavigate } from "@/components/common";
import React from "react";

const TermAndConditions = () => {
  return (
    <>
      <OrderNavigate
        pageHeading="ZeitBlast Terms Of Services        "
        data={DummyData}
      />
    </>
  );
};

export default TermAndConditions;

const DummyData = [
  {
    title: "LAST UPDATED: June 1, 2024    ",
    text: "The following Terms of Service (the “Agreement”) are entered into by and between ZeitBlast (“ZeitBlast”) and the person or entity on whose behalf the Services (as defined below) are used or accessed (the “Subscriber”) governing our platform services, including our programs, features, account portals, and technical support (the “Services”). If you do not agree to this Agreement, you are prohibited from using or accessing our Services. We may modify these terms at any time by posting the revised terms to our website. Your continued use of our Service means that you have accepted the changed terms.    ",
    lists: [
      {
        title: "Grant of License.",
        text: `Subject to the terms and conditions of this Agreement, ZeitBlast grants Subscriber a limited, revocable, non-exclusive, non-sublicensable, non-transferable, non-assignable license to access the Services for the Term of this Agreement. Subscriber’s license and use of the Services are permitted solely for the purposes stated in this Agreement and is subject to the restrictions set forth herein. Except for the foregoing limited license, Subscriber does not receive any right, title, or interest in or to the Services and Subscriber acknowledges that ZeitBlast retains all right, title, and interest in the Services including all intellectual property rights therein.`,
      },
      {
        title: "  Limited Purposes.",
        text: `Subscriber’s access and use of the Services are limited to identifying and communicating with leads regarding prospective transactions. Subscriber has no right to access, share, or otherwise use the Services for any other purpose.`,
      },
      {
        title: "Access and Security. ",
        text: `The Services may be accessed by Subscriber through its employees, agents, or representatives that are authorized by Subscriber. Subscriber shall ensure that only authorized individuals shall have access to the Services. Subscriber shall promptly inform ZeitBlast of any unauthorized access to the Services or the loss or theft of its access credentials. Subscriber is responsible for all access and use of the Services using Subscriber’s access credentials regardless of whether such access and use was authorized by Subscriber. Subscriber shall be responsible for, and liable to ZeitBlast for, any security breaches by Subscriber, its employees, agents, or representatives.`,
      },
      {
        title: "Restrictions.",
        text: `Subscriber shall not: (i) modify or create any derivative works of the Services; (ii) modify the Services or reverse assemble, disassemble, decompile, engineer, or otherwise attempt to derive source code from the Services; (iii) redistribute, encumber, sell, rent, lease, sub-license, pledge, assign or otherwise transfer rights to the Services; (iv) remove or alter any trademark, logo, copyright or other proprietary notices, legends, symbols or labels in the Services; (v) access or use the Services for any unlawful or illegal purpose; or (vi) provide access to or use of the Services on any computer network or allow concurrent use thereof by more than one individual without the prior written permission of ZeitBlast.`,
      },
      {
        title: "  Compliance with Law.",
        text: `Subscriber agrees to use the Services in accordance with all applicable federal, state, and local laws and regulations and industry standards. Without limiting the generality of the foregoing, Subscriber will use the Services in compliance with the Telephone Consumer Protection Act of 1991 (“TCPA”) and all regulations implementing the TCPA, other teleservices laws and regulations, and privacy and data security laws and regulations. While the Services may provide skip tracing data, communication templates, advice, and recommendations, and other features, Subscriber bears sole responsibility for compliance with applicable laws and regulations and sole liability for any and all communications sent using the Services.        `,
      },
      {
        title: " Subscriber Data. ",
        text: `Subscriber provides to ZeitBlast a non-exclusive, royalty-free, worldwide, perpetual, irrevocable, transferrable, sublicensable license to use, copy, perform, reproduce, display, and distribute, including to create derivative works or incorporate into other works, all Subscriber-owned data provided by Subscriber or which Subscriber makes available to ZeitBlast in connection with Subscriber’s use of the Services (“Subscriber Data”) for the limited purpose of fulfilling ZeitBlast’s obligations under this Agreement, including without limitation conducting research, development, usage monitoring, and other day-to-day business activities.        `,
      },
      {
        title: " Usage Data.",
        text: `Subscriber acknowledges that ZeitBlast may obtain certain usage, technical, and statistical data regarding Subscriber’s use of the Services and that such usage, technical, and statistical data is the sole property of ZeitBlast and is not Subscriber Data. ZeitBlast may use and disclose usage, technical, and statistical data without restriction.`,
      },
      {
        title: "Payment.",
        text: `Subscriber’s access to and use of the Services is contingent upon payment of all subscription and other fees as set forth by ZeitBlast.  Subscriber’s failure to timely pay all amounts due shall be grounds for ZeitBlast, at its election, to limit or eliminate Subscriber’s access to the Services, including any information or data contained therein.  All fees are due when charged by ZeitBlast and are non-refundable except as explicitly provided herein.  ZeitBlast may increase subscription charges or other prices at any time, and will provide at least 30 days’ notice of any price increase.  Subscriber is responsible for all taxes and governmental fees associated with Subscriber’s use of the Services.`,
        list: [],
      },
      {
        title: "Auto Payment Terms and Cancellation. ",
        text: `Unless otherwise agreed to by ZeitBlast, Subscriber’s use of the Services will be subject to a monthly subscription that will automatically renew every month until Subscriber cancels its services.  Monthly subscription fees are paid in advance and are non-refundable, even if Subscriber cancels mid-month.  All monthly service fee payments are made in advance for the following month of Services.  Subscriber must cancel at least five business days prior to the monthly renewal date to prevent charges for the following month of Services.  Subscriber may cancel its subscription by accessing your account settings or [call/email/etc.].`,
      },

      {
        title: "Confidentiality",
        text: `During the performance of the Services, each party may disclose (the “Disclosing Party”) or receive (the “Receiving Party”) information of a confidential nature that is of value to the Disclosing Party, whether written or oral, that is (a) marked as “confidential,” or with a similar designation; (b) identified by the Disclosing Party as confidential and/or proprietary before, during, or promptly after presentation or communication; or (c) disclosed to (or otherwise acquired by) Receiving Party in a manner in which the Disclosing Party reasonably communicated, or the Receiving Party should reasonably have understood under the circumstances or from the nature of the information or data disclosed, that the information or materials should be treated as confidential, whether or not the specific designation “confidential” or any similar designation is used (“Confidential Information”).        `,
      },
      {
        title: "Disclosure and Use.",
        text: `Except as provided below or with the prior written consent of the Disclosing Party, the Receiving Party will not: (a) disclose any Confidential Information of the Disclosing Party other than on a need-to-know basis to its directors, officers, members, managers, employees, affiliates, attorneys, and contractors, solely to the extent and only for the purpose of performing or exercising the Receiving Party’s rights and obligations under this Agreement; (b) except as otherwise provided in this Agreement, use Confidential Information other than for fulfilling the obligations or exercising the rights of the Receiving Party under this Agreement; (c) allow others to make copies of such Confidential Information except as is reasonably necessary to fulfill the Receiving Party’s obligations or exercise its rights under this Agreement; or (d) remove or export any such Confidential Information in violation of any applicable law. The Receiving Party shall treat the Confidential Information of the Disclosing Party, and will cause its directors, employees, attorneys, affiliates, and contractors to treat such Confidential Information, with at least the same degree of care and protection as it would use with respect to its own Confidential Information of a similar nature, but in no event less than reasonable care.        `,
      },
      {
        title: "Disclosure and Use Exceptions   ",
        text: `The obligations set forth above shall not apply with respect to the use or disclosure of information: (a) previously known to the Receiving Party without obligation of confidence; (b) independently developed by or for the Receiving Party without use of or access to the Disclosing Party’s Confidential Information and without breaching this Agreement; (c) acquired by the Receiving Party from a third party which is not under an obligation of confidence with respect to such information; or (d) which is or becomes publicly available through no breach of this Agreement. A Receiving Party may make a disclosure of Confidential Information if required either by applicable law or legal process (as a result of legal compulsion or in order to advance a defense to a claim), in response to a request by a governmental authority or in connection with a proceeding before a court, adversary proceeding, administrative proceeding, governmental or regulatory proceeding, if (i) the Receiving Party only discloses that portion of the Confidential Information reasonably required to be disclosed; and (ii) unless prohibited by law, the Receiving Party provides reasonable notice to the Disclosing Party in advance of the disclosure so that the Disclosing Party may seek confidential treatment for the Confidential Information, a protective order or other appropriate remedy, relief or reliable assurances that confidential treatment will be afforded the information so disclosed at the sole cost and expense of the Disclosing Party or consent in writing to having the Confidential Information so produced or so disclosed (which consent will extend solely to the disclosure and production in question).`,
      },
      {
        title: " Return and Remedies  . ",
        text: `Upon the request of the Disclosing Party, or upon termination of this Agreement, Receiving Party will promptly return (or, with written permission from the Disclosing Party, destroy) all copies of any Confidential Information in its possession or control and, upon request, will acknowledge to the Disclosing Party in writing that such delivery or destruction has been fully effected. The Receiving Party acknowledges that the unauthorized disclosure or use of such Confidential Information would cause irreparable harm and significant injury, the degree of which may be difficult to ascertain. Accordingly, the Receiving Party agrees that the Disclosing Party will have the right to obtain an immediate injunction enjoining any breach of the Disclosing Party’s confidentiality obligations, as well as the right to pursue any and all other rights and remedies available at law or in equity for such a breach.`,
      },
      {
        title: " Termination.",
        text: `Without limiting its rights elsewhere in this Agreement, ZeitBlast may terminate this Agreement and Subscriber’s use of the Services at any time for convenience, with or without notice. In the event ZeitBlast terminates this Agreement without cause, ZeitBlast will provide Subscriber a pro rata refund of paid for but unused Services. In the event ZeitBlast terminates this Agreement for cause, including, without limitation, due to (i) Subscriber’s failure to timely pay all fees when due, (ii) Subscriber’s assignment for the benefit of its creditors, filing of a bankruptcy petition, filing of a bankruptcy petition against it, or other insolvency event, or (iii) Subscriber’s breach or likely breach of this Agreement, as determined by ZeitBlast in its sole discretion, ZeitBlast will not provide any refund.        `,
      },
      {
        title: "Indemnification   ",
        text: `Subscriber will defend (at ZeitBlast’s option), indemnify, and hold ZeitBlast and its affiliates, subsidiaries, successors, assignees, owners, directors, officers, employees, contractors, representatives, and agents (collectively, “ZeitBlast Indemnitees”) harmless from and against any and all claims, governmental investigations, demands, actions, and proceedings, real or threatened, and all losses, judgments, awards, settlements, damages, fines, injuries, penalties, and costs (including, without limitation, reasonable attorneys’ fees and expenses) arising out of or related to (i) any breach or alleged breach of this Agreement, including the representations and warranties contained herein, by Subscriber, (ii) Subscriber’s negligence or misconduct, or (iii) Subscriber’s use of the Services or information obtained therefrom (including without limitation Subscriber transmitting or receiving communications through the Service). If ZeitBlast elects for Subscriber to provide defense, Subscriber will (i) obtain legal counsel reasonably acceptable to ZeitBlast; (ii) permit ZeitBlast to participate in the defense using separate counsel at ZeitBlast’s cost; and (iii) not settle any action without the prior written consent of ZeitBlast (which may not be unreasonably withheld). The foregoing indemnification obligations represent the sole indemnification protections intended and the Parties waive all right to any other indemnification protections provided by common law, statute, or otherwise.`,
      },
      {
        title: " Warranty Disclaimer   ",
        text: `The parties acknowledge that ALL ASPECTS OF THE SERVICES, INCLUDING WITHOUT LIMITATION ALL SKIP TRACE DATA, SOFTWARE, SERVER AND NETWORK COMPONENTS ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS, WITHOUT ANY WARRANTIES OF ANY KIND TO THE FULLEST EXTENT PERMITTED BY LAW, AND ZEITBLAST EXPRESSLY DISCLAIMS ANY AND ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OF MERCHANTABILITY, TITLE, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. SUBSCRIBER ACKNOWLEDGES THAT ZEITBLAST DOES NOT WARRANT THAT ACCESS TO THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, ERROR-FREE OR FREE FROM VIRUSES OR OTHER MALICIOUS SOFTWARE, AND NO INFORMATION OR ADVICE OBTAINED BY SUBSCRIBER FROM ZEITBLAST SHALL CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THIS AGREEMENT.`,
      },
      {
        title: " Limitation of Liability. ",
        text: `IN NO EVENT SHALL ZEITBLAST BE LIABLE TO SUBSCRIBER FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, SPECIAL, INCIDENTAL, ACTUAL, PUNITIVE OR OTHER DAMAGES, OR FOR ANY LOST PROFITS OF ANY KIND OR NATURE WHATSOEVER, ARISING FROM OR IN CONNECTION WITH THE SERVICES. IF ZEITBLAST IS EVER DETERMINED TO HAVE ANY LIABILITY TO SUBSCRIBER ARISING DIRECTLY OR INDIRECTLY FROM OR IN CONNECTION WITH THE SERVICES OR THIS AGREEMENT, SUCH LIABILITY SHALL NOT EXCEED THE TOTAL AMOUNT OF FEES PAYABLE TO ZEITBLAST UNDER THIS AGREEMENT DURING THE CALENDAR QUARTER ENDING IMMEDIATELY PRIOR TO THE DATE THE CAUSE OF ACTION AROSE.        `,
      },
      {
        title: "Third Party Content          ",
        text: `From time to time, ZeitBlast may offer third-party applications, APIs, and related services through or in connection with the Services. Subscriber acknowledges and understands that the use of such third-party applications, APIs, and related services may be subject to separate terms and conditions contained on the websites of, or as otherwise provided or made available by those third-party providers.`,
      },
      {
        title: " Third Party Data Sharing.",
        text: `From time to time, ZeitBlast may offer Subscriber the ability to link Subscriber’s Services account with a third-party service as a convenience to Subscriber. Subscriber agrees that such third-party service may share Subscriber’s data and personal information with ZeitBlast and ZeitBlast may use Subscriber’s access credentials for such third-party service to validate Subscriber’s right to link the third-party service account to the Services and to facilitate such data transfer. Subscriber acknowledges and agrees that ZeitBlast is not responsible for the third-party service, data or information provided by the third-party service to ZeitBlast, or Subscriber’s use of the third-party service alone or in connection with the Services.`,
      },

      {
        title: "Relationship of the Parties.  ",
        text: `The parties hereto are independent contractors.  Neither party is an employee, agent, partner or joint venture of the other.  Neither party shall have the right to bind the other to any agreement with a third party or to incur any obligation or liability on behalf of the other party.`,
      },
      {
        title: "Dispute Resolution.",
        text: `Any dispute, controversy or claim arising out of, relating to, or in connection with this Agreement or any breach, termination or validity thereof (a “Dispute”) shall be solely and exclusively resolved by arbitration. The demand for arbitration shall be made within a reasonable time after the Dispute has arisen, but in no event shall it be made more than one year from when the aggrieved party knew or should have known of the controversy, claim, or facts forming the basis of the Dispute. The arbitration shall be initiated and conducted according to American Arbitration Association rules and procedures for commercial arbitration, including provisions for the resolution of consumer disputes, if applicable (the “Arbitration Rules”). The arbitration shall be conducted in Los Angeles County, California before a single neutral arbitrator appointed in accordance with the Arbitration Rules. Either party may bring a Dispute in small claims court in Los Angeles County, California to the extent permitted by the Arbitration Rules. If the amount in controversy is less than $10,000, the parties agree that the Dispute will be decided on the basis of written submissions without a hearing. The decision of the arbitrator will be final without option to appeal. To the fullest extent permitted by law, the arbitrator shall not have the power to award punitive, special, consequential, or indirect damages against any party. Arbitration costs and fees shall be divided in accordance with the Arbitration Rules. Each party shall be responsible for paying its own attorneys’ fees, costs, and expenses, regardless of which party prevails, but a party may recover any or all expenses from another party if the arbitrator, applying applicable law, so determines. No disputes may be arbitrated on a class or representative basis and the arbitrator may not consolidate or join the claims of other persons or parties who may be similarly situated. BY AGREEING TO THIS AGREEMENT, EACH PARTY IRREVOCABLY WAIVES ANY RIGHT IT MAY HAVE TO JOIN CLAIMS OR DISPUTES WITH THOSE OF OTHERS IN THE FORM OF A CLASS ACTION, CLASS ARBITRATION, OR SIMILAR PROCEDURAL DEVICE; AND WAIVES ANY RIGHT IT MAY HAVE TO PRESENT ITS CLAIM OR DISPUTE IN A COURT OF LAW OR BEFORE A JURY. Judgment on the award rendered by the arbitrator(s), if any, may be entered for enforcement purposes in any court having jurisdiction thereof.`,
      },
      {
        title: "Governing Law. ",
        text: `This Agreement is governed according to the laws of the State of California, without regard to its conflicts of law principles. Subject to the dispute resolution process described above, all claims, disputes, and suits must be brought exclusively in the state or federal courts located in Los Angeles County, California, and the parties agree to the jurisdiction thereof.`,
      },
      {
        title: "Export Laws and International Privacy. ",
        text: ` Subscriber agrees to fully comply with all U.S. and other applicable export laws and regulations. Subscriber is not permitted to use the Services in connection with the processing of personal data of an EU, EEA, UK, or Swiss data subject or of any person located outside the United States of America.    `,
      },
      {
        title: "Feedback and Trademarks.",
        text: `If Subscriber provides any ideas, suggestions, or recommendations regarding the Services (“Feedback”), ZeitBlast will be free to use, disclose, reproduce, license or otherwise distribute, and exploit such Feedback as it sees fit, entirely without obligation or restriction of any kind and without compensation or notice to Subscriber. By providing Feedback, Subscriber grants ZeitBlast a worldwide, perpetual, irrevocable, sublicensable, fully-paid and royalty-free license to use and exploit in any manner such Feedback. If Subscriber is using the Services in a business or for business purposes, it grants ZeitBlast a worldwide, perpetual, irrevocable, sublicensable, fully-paid and royalty-free license to use Subscriber’s trade name (and the corresponding trademark or logo) on the ZeitBlast website and marketing materials to identify Subscriber as a current or former customer.`,
      },
      {
        title: " Severability and Survivability. ",
        text: ` If a court of competent jurisdiction holds any provision of this Agreement to be contrary to law or public policy or otherwise unenforceable, the remaining provisions shall remain in full force and effect; and the invalid provision shall remain in force as reformed by the court. Portions of this Agreement which by their nature would survive termination thereof (e.g., disclaimer of warranties, limitation of liability, indemnification) shall be deemed to survive. `,
      },
      {
        title: "  Waiver. ",
        text: `No term or provision of this Agreement shall be deemed waived and no breach consented to or excused, unless such waiver, consent or excuse is in writing and signed by the party claiming to have waived, consented or excused.  Should either party consent, waive or excuse a breach by the other party, such shall not constitute a consent to, waiver of, or excuse of any other different or subsequent breach whether or not of the same kind as the original breach.`,
      },
      {
        title: "Miscellaneous.",
        text: `Each party represents and warrants to the other party that such party has the legal power to enter into this Agreement, that the signatory hereto has the authority to bind the applicable party, and this Agreement will constitute a legal, valid, and binding obligation of each party in accordance with its terms. Except for the payment of fees by Subscriber, if either party is rendered unable, wholly or in part, to carry out its obligations hereunder due to a force majeure event (i.e., act of God, strike, industrial disturbance, fire, storm, flood, epidemic/pandemic, utility failure, governmental restraint, war, or other similar event), such party’s obligations under this Agreement will be suspended during the force majeure event. Subscriber agrees that ambiguities in this Agreement will not be construed against ZeitBlast by attribution of drafting. ZeitBlast may assign any of its rights or obligations to others at any time without notice to Subscriber. Subscriber may not assign any of its rights or obligations to others without ZeitBlast’s prior written consent.`,
      },
      {
        title: "   ZeitBlast Messaging Terms & Conditions ",
        text: `These ZeitBlast Messaging Terms & Conditions apply to your participation in the promotional text message program (the “Program”) provided by ZeitBlast (“ZeitBlast”, “we”, “us”, “our”). They supplement our general Terms and Conditions which are incorporated by reference herein. Your participation in the Program is also subject to our Privacy Policy. We may update these Terms & Conditions at any time by posting an updated version on this website. Any changes will be effective immediately upon posting.        `,
        list: [],
      },
      {
        title: "Consent",
        text: `By agreeing to participate in the Program, you agree to receive recurring automated promotional and personalized marketing text (e.g., SMS and MMS) messages (e.g., cart reminders) from ZeitBlast, including text messages that may be sent using an automatic telephone dialing system, to the mobile telephone number you provided when signing up or any other number that you designate. Consent to receive automated marketing text messages is not a condition of any purchase. Msg & Data rates may apply. Message frequency will vary. ZeitBlast reserves the right to alter the frequency of messages sent at any time, so as to increase or decrease the total number of sent messages. ZeitBlast also reserves the right to change the short code or phone number from which messages are sent and we will notify you when we do so. Not all mobile devices or handsets may be supported and our messages may not be deliverable in all areas. ZeitBlast, its service providers, and the mobile carriers supported by the program are not liable for delayed or undelivered messages.`,
      },
      {
        title: "Cancellation",
        text: `Text the keyword STOP, END, CANCEL, UNSUBSCRIBE or QUIT to cancel. After texting STOP, END, CANCEL, UNSUBSCRIBE, or QUIT you will receive one additional message confirming that your request has been processed. You acknowledge that our text message platform may not recognize and respond to unsubscribe requests that do not include the STOP, END, CANCEL, UNSUBSCRIBE, or QUIT keyword commands and agree that ZeitBlast and its service providers will have no liability for failing to honor such requests.`,
      },
      {
        title: "Help",
        text: `Text the keyword HELP to return customer care contact information.`,
      },
      {
        title: "Customer Care",
        text: `If you are experiencing any problems, please email info@zeitblast.com.
        `,
      },
    ],
  },
];
