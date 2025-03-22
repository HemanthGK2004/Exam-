import { useExamSecurity } from '../hooks/useExamSecurity';

const ExamSecurity = ({ examState }) => {
  const { videoStream, riskLevel } = useExamSecurity(examState, (violation) => {
    console.log("Violation Detected:", violation);
  });

  return (
    <div>
      <h3>Security Status: {riskLevel}</h3>
      {videoStream && (
        <video autoPlay playsInline ref={(video) => video && (video.srcObject = videoStream)} style={{ width: '200px', borderRadius: '10px' }} />
      )}
    </div>
  );
};
export default ExamSecurity;
