import { useClientCurrentPlan } from '../../../../../Hooks/clientDashBoard/useClientCurrentPlan';
import { usePlanPricing } from '../../../../../Hooks/usePlanPricing';
import { customErrorLog } from '../../../../../utils/customErrorLog';


const UsageCard = ({ openDialog, openChangePlan }) => {
  const { data } = useClientCurrentPlan()
  const { data: allPlanes } = usePlanPricing()

  const planesArray = allPlanes?.data?.data;
  const currentPlanData = data?.data;

  const currentPlan = (planesArray ?? []).find(plan => plan.id === currentPlanData?.["your plan id"]);

  const total = currentPlan?.orders_limit ?? 0;
  const remain = currentPlanData?.remain_orders ?? 0;
  const used = total - remain;


  const percentage = Math.min((remain / total) * 100, 100);

  const planName = currentPlan?.name || "Unknown Plan";
  return (
    <div className="usage-card">
      <div className="plan-name">{planName}</div>
      <div className="usage-info">
        Used: {used} / {total}
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="usage-percentage">{percentage.toFixed(0)}%</div>

      <div className="button-group">
        <button className="main-button" onClick={openChangePlan}>Change Plan</button>
        <button className="secondary-button" onClick={openDialog}>Renew Plan</button>
      </div>


    </div>
  );
};

export default UsageCard