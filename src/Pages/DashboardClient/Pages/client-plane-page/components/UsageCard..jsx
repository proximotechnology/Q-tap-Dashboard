
const UsageCard = ({ planName, used, total, openDialog ,openChangePlan }) => {
  const percentage = Math.min((used / total) * 100, 100);


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