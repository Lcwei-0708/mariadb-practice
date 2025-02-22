import { memo } from 'react';

const TestConfigForm = memo(({ concurrentUsers, setConcurrentUsers, totalRequests, setTotalRequests }) => {
  const configItems = [
    { label: '同時測試人數', value: concurrentUsers, setValue: setConcurrentUsers },
    { label: '總共測試次數', value: totalRequests, setValue: setTotalRequests },
  ];

  return (
    <div className="test-config-container">
      <h2>測試配置</h2>
      <div className="config-form">
        {configItems.map((item, index) => (
          <div className="form-group" key={index}>
            <label>{item.label}:</label>
            <input
              type="number"
              value={item.value}
              onChange={(e) => item.setValue(Number(e.target.value))}
              min="1"
            />
          </div>
        ))}
      </div>
    </div>
  );
});

export default TestConfigForm;