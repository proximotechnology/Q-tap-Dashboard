import { useState } from 'react';
import { useClientCurrentPlan } from '../../../../../../Hooks/Queries/clientDashBoard/plan/useClientCurrentPlan';
import { useAuthStore } from '../../../../../../store/zustand-store/authStore';
import ConfirmDialog from '../change-plane-component/ConfirmDialog';


const UsageCard = () => {
  const token = useAuthStore(state => state.userData.token)
  const [isDialogOpen, setDialogOpen] = useState(false);

  const { data, isPending } = useClientCurrentPlan({ token })
  const currentPlansData = data?.data?.subscriptions?.data


  if (isPending) {
    return "loading"
  }

  // const planName = currentPlan?.name || "Unknown Plan";
  return (
    currentPlansData?.map(items => {
      const remain = items.ramin_order
      const name = items.pricing.name
      const capacity = items.pricing.orders_limit
      const pricingWay = items.pricing_way
      const status = items.status
      const Carryover = capacity < remain ? remain - capacity : undefined

      const used = Carryover ? 0 : capacity - remain;
      // let 
      const percentage = Math.min((remain / capacity) * 100, 100);
      return (

        <div className="usage-card">
          <div className="plan-name">{name}</div>
          {
            Carryover && <>
              <p style={{ marginBottom: "2px", marginTop: "20px" }}>Carry Over</p>
              <div className="usage-info">
                Used: {0} / {Carryover}
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${100}%` }}
                ></div>
              </div>
              <p style={{ marginBottom: "2px", marginTop: "20px" }}>Main Plan</p>
            </>
          }
          <div className="usage-info">
            Used: {used} / {capacity}
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="usage-percentage">{percentage.toFixed(0)}%</div>

          <div className="button-group">
            <button className="secondary-button" onClick={() => setDialogOpen(true)}>Renew Plan</button>
          </div>

          <ConfirmDialog
            isOpen={isDialogOpen}
            onClose={() => setDialogOpen(false)}
          />
        </div>
      )
    })

  );
};

export default UsageCard




