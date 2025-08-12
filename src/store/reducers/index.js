import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import roleReducer from "./role.reducer";
import permissionReducer from "./permission.reducer";
import campaignReducer from "./campaign.reducer";
import directImportReducer from "./directImport.reducer";
import marketReducer from "./market.reducer";
import templateReducer from "./template.reducer";
import batchReducer from "./batch.reducer";
import inboxAllMessageReducer from "./inboxAllMessage.reducer";
import inboxUserMessageReducer from "./inboxUserMessage.reducer";
import sendInboxMessage from "./sendMessage.reducer";
import inboxUserNote from "./inboxUserNote.reducer";
import tagReducer from "./tag.reducer";
import reminderReducer from "./remainder.reducer";
import selectedRemainderReducer from "./selectedRemainder.reducer";
import statusReducer from "./status.reducer";
import statsReducer from "./stats.reducer";
import dashboardReducer from "./dashboard.reducer";
import dripAutomationReducer from "./dripAutomation.reducer";
import dncReducer from "./dnc.reducer";
import areaCodeReducer from "./areaCode.reducer";
import tenetsReducer from "./tenets.reducer";
import billingReducer from "./billing.reducer";
import userReducer from "./user.reducer";


const rootReducer = combineReducers({
  authReducer,
  roleReducer,
  permissionReducer,
  campaignReducer,
  directImportReducer,
  marketReducer,
  templateReducer,
  batchReducer,
  inboxAllMessageReducer,
  inboxUserMessageReducer,
  sendInboxMessage,
  inboxUserNote,
  tagReducer,
  reminderReducer,
  selectedRemainderReducer,
  statusReducer,
  statsReducer,
  dashboardReducer,
  dripAutomationReducer,
  dncReducer,
  areaCodeReducer,
  tenetsReducer,
  billingReducer,
  tenetsReducer,
  userReducer
});

export default rootReducer;
