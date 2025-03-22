🚀 Risk-Based Proctoring System
A secure online exam system with real-time risk-based proctoring using behavioral analysis. This system enhances online exam security by monitoring student behavior, detecting anomalies, and taking appropriate actions based on risk levels.

📌 Key Features
✅ Student Verification – Secure login with a 6-digit verification code.
✅ Fullscreen Enforcement – Prevents cheating by restricting tab switching.
✅ Real-Time Risk Detection – Tracks tab switches, unusual typing patterns, and suspicious activities.
✅ Adaptive Risk Management – Issues warnings and automatically terminates tests for severe violations.
✅ Live Warning System – Provides real-time alerts for security breaches.
✅ Time-Tracked Questions – Ensures students answer within the allotted time.
✅ AI-Based Proctoring Enhancements – Future extensions for face detection, multiple faces, and eye-tracking.

🛠 Tech Stack
Frontend (React.js - Next.js)
React.js

Next.js

Tailwind CSS

Lucide Icons

React Hot Toast (for alerts)

Backend (Node.js - FastAPI)
Node.js – Handles test logic and security monitoring

FastAPI – AI-based risk scoring & behavioral analysis

Database (MongoDB/Firebase)
Stores user data, test records, and risk levels

🏗 How It Works
1️⃣ Student Verification
Users enter a 6-digit verification code to begin the exam.

2️⃣ Fullscreen Enforcement
The exam requires fullscreen mode to start.

If a student exits fullscreen, a warning is issued.

3️⃣ Behavior Tracking
Detects tab switches, unusual typing, and suspicious activities.

4️⃣ Risk Scoring System
LOW RISK (✅) – No violations.

MEDIUM RISK (⚠️) – 1 or 2 warnings issued.

HIGH RISK (❌) – Test terminated after 3 violations.

5️⃣ Warning & Termination
1st Violation: ⚠️ First warning

2nd Violation: ❗ Final warning

3rd Violation: ❌ Test Terminated

6️⃣ Exam Completion
The test is submitted when time runs out or when all questions are answered.

🚀 Getting Started
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/yourusername/risk-based-proctoring.git
cd risk-based-proctoring
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Start the Development Server
bash
Copy
Edit
npm run dev
4️⃣ Backend Setup (FastAPI)
Navigate to the backend folder:

bash
Copy
Edit
cd backend
Create a virtual environment:

bash
Copy
Edit
python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate     # On Windows
Install dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Start the FastAPI backend:

bash
Copy
Edit
uvicorn main:app --reload
🎯 Future Enhancements
🔹 AI-powered facial recognition for identity verification.
🔹 Voice detection for suspicious sounds.
🔹 Screen recording for post-exam analysis.
🔹 ML-based risk prediction for dynamic security adjustments.

🤝 Contributing
Contributions are welcome! Follow these steps:

Fork the repository

Create a feature branch (git checkout -b feature-name)

Commit your changes (git commit -m "Add feature")

Push to your branch (git push origin feature-name)

Open a Pull Request

📜 License
This project is MIT Licensed. See the LICENSE file for details.

⭐ Support the Project
If you find this project helpful, please give it a star ⭐ and share it with others! 🚀
