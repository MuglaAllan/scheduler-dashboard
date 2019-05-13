// Cards
import ChartCard from './Cards/ChartCard.vue'
import NavTabsCard from './Cards/NavTabsCard.vue'
import StatsCard from './Cards/StatsCard.vue'

// Tables
import NavTabsTable from './Tables/NavTabsTable.vue'
import PermitQueueTable from './Tables/PermitQueueTable.vue'
import PermitSuspendedTable from './Tables/PermitSuspendedTable.vue'
import MahaStatusTable from './Tables/MahaStatusTable.vue'
import SystemConfigurationFeeTable from './Tables/SystemConfigurationFeeTable.vue'
import SystemConfigurationValuesTable from './Tables/SystemConfigurationValuesTable.vue'
import RegistrationNoByTypeTable from './Tables/RegistrationNoByTypeTable.vue'
import VrsApplicationsTable from './Tables/VrsApplicationsTable.vue'
import VrsInFlightTable from './Tables/VrsInFlightTable.vue'

// Stores
import DashboardPermit from '../store/modules/dashPermit.js'
import IssuePermit from '../store/modules/issuePermit.js'
import RegistrationNo from '../store/modules/registrationNo.js'
import Scheduler from '../store/modules/scheduler.js'
import SystemConfiguration from '../store/modules/systemConfiguration'
import Vrs from '../store/modules/vrs.js'

// Wizards
import IssuePermitWizard from './Wizard/IssuePermitWizard.vue'
import TradeLicenseWizard from './Wizard/TradeLicenseWizard.vue'
import VrsWizard from './Wizard/VrsWizard.vue'

// Modals
import DashPermitAcceptModal from './Modals/DashPermitAcceptModal.vue'
import DashPermitDeclineModal from './Modals/DashPermitDeclineModal.vue'
import DashPermitReactivateModal from './Modals/DashPermitReActivateModal.vue'
import DashPermitModal from './Modals/DashPermitModal.vue'
import IssueRenewPermitModal from './Modals/IssueRenewPermitModal.vue'
import IssueSuspendPermitModal from './Modals/IssueSuspendPermitModal.vue'
import MahaStatusModal from './Modals/MahaStatusModal.vue'
import SchedulerDetailModal from './Modals/SchedulerDetailModal.vue'
import SchedulerAddModal from './Modals/SchedulerAddModal.vue'
import ParishApproveDeclineModal from './Modals/ParishApproveDeclineModal.vue'
import OperationalModal from './Modals/OperationalModal.vue'
import SysConfigAddModal from './Modals/SysConfigAddModal.vue'
import OwnerIdModal from './Modals/OwnerIdModal.vue'
import RegistrationNoSelectModal from './Modals/RegistrationNoSelectModal.vue'
import VrsPreviewModal from './Modals/VrsPreviewModal.vue'
import VrsReceiptModal from './Modals/VrsReceiptModal.vue'
import VrsScheduleAddModal from './Modals/VrsScheduleAddModal.vue'

// Scheduler
import SchedulerEntry from './Scheduler/SchedulerEntry.vue'

// Forms
import MahaUnAssigned from './Forms/MahaUnAssigned.vue'
import NewVrs from './Forms/NewVrs.vue'
import OwnerBusiness from './Forms/OwnerBusiness.vue'
import OwnerPerson from './Forms/OwnerPerson.vue'
import CompleteVrs from './Forms/CompleteVrs.vue'
import RecallVrs from './Forms/RecallVrs.vue'
import RegNoBatchAllocation from './Forms/RegNoBatchAllocation.vue'
import RegNoHistory from './Forms/RegNoHistory.vue'
import ChangeOwnership from './Forms/ChangeOwnership.vue'
import ExchangeOwnership from './Forms/ExchangeOwnership.vue'
import RetainChangeOwnership from './Forms/RetainChangeOwnership.vue'

export {
  ChartCard,
  NavTabsCard,
  StatsCard,
  NavTabsTable,
  PermitQueueTable,
  PermitSuspendedTable,
  MahaStatusTable,
  SystemConfigurationFeeTable,
  SystemConfigurationValuesTable,
  RegistrationNoByTypeTable,
  VrsApplicationsTable,
  VrsInFlightTable,
  IssuePermitWizard,
  TradeLicenseWizard,
  VrsWizard,
  DashboardPermit,
  IssuePermit,
  Vrs,
  RegistrationNo,
  Scheduler,
  SystemConfiguration,
  DashPermitAcceptModal,
  DashPermitDeclineModal,
  DashPermitReactivateModal,
  DashPermitModal,
  IssueRenewPermitModal,
  IssueSuspendPermitModal,
  MahaStatusModal,
  SchedulerDetailModal,
  SchedulerAddModal,
  ParishApproveDeclineModal,
  OperationalModal,
  SysConfigAddModal,
  OwnerIdModal,
  RegistrationNoSelectModal,
  VrsPreviewModal,
  VrsReceiptModal,
  VrsScheduleAddModal,
  SchedulerEntry,
  MahaUnAssigned,
  NewVrs,
  OwnerBusiness,
  OwnerPerson,
  CompleteVrs,
  RecallVrs,
  RegNoBatchAllocation,
  RegNoHistory,
  ChangeOwnership,
  ExchangeOwnership,
  RetainChangeOwnership
}
