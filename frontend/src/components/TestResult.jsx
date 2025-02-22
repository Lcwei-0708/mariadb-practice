import { memo } from 'react';

const TestResult = memo(({ result, error }) => {
  if (error) {
    return (
      <div className="error-container">
        <h2>錯誤</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!result) return null;

  const resultItems = [
    { label: '總共測試次數', value: result.total_requests },
    { label: '同時測試人數', value: result.concurrent_users },
    { label: '總時間', value: result.total_time },
    { label: '每秒查詢數', value: result.qps },
    { label: '平均延遲', value: result.average_latency },
    { label: '最大延遲', value: result.max_latency },
    { label: '最小延遲', value: result.min_latency },
    { label: '錯誤數', value: result.errors },
    { label: '失敗率', value: result.failure_rate },
  ];

  return (
    <div className="result-container">
      <h2>測試結果</h2>
      <div className="result-grid">
        {resultItems.map((item, index) => (
          <div className="result-item" key={index}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
});

export default TestResult;