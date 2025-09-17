import React from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle, Calendar, Package, Clock, CreditCard } from 'lucide-react';

const steps = [
  { name: 'Arrival', path: '/planner', icon: Calendar },
  { name: 'Packages', path: '/packages', icon: Package },
  { name: 'Schedule', path: '/scheduler', icon: Clock },
  { name: 'Checkout', path: '/checkout', icon: CreditCard },
  { name: 'Done', path: '/success', icon: CheckCircle },
];

const ProgressStepper: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getStepStatus = (stepPath: string, index: number) => {
    const currentStepIndex = steps.findIndex(step => step.path === currentPath);
    const stepIndex = steps.findIndex(step => step.path === stepPath);

    if (stepIndex < currentStepIndex) {
      return 'completed';
    } else if (stepIndex === currentStepIndex) {
      return 'active';
    } else {
      return 'inactive';
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm py-4 px-4 sm:px-6 lg:px-8">
      <nav className="max-w-7xl mx-auto flex justify-between items-center" aria-label="Progress">
        <ol role="list" className="flex items-center w-full justify-between">
          {steps.map((step, stepIdx) => {
            const status = getStepStatus(step.path, stepIdx);
            const Icon = step.icon;

            return (
              <li key={step.name} className="flex-1 relative flex justify-center items-center">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300
                      ${status === 'completed' ? 'bg-blue-600' : ''}
                      ${status === 'active' ? 'bg-blue-500 ring-2 ring-blue-500 ring-offset-2' : ''}
                      ${status === 'inactive' ? 'bg-gray-100 border border-gray-300' : ''}
                    `}
                  >
                    {status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-white" aria-hidden="true" />
                    ) : (
                      <Icon
                        className={`h-5 w-5 transition-colors duration-300
                          ${status === 'active' ? 'text-white' : 'text-gray-500'}
                        `}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <p
                    className={`mt-2 text-xs font-medium whitespace-nowrap transition-colors duration-300
                      ${status === 'active' ? 'text-blue-600' : 'text-gray-500'}
                    `}
                  >
                    {step.name}
                  </p>
                </div>

                {stepIdx !== steps.length - 1 && (
                  <div
                    className={`absolute top-1/2 left-1/2 w-full -translate-y-1/2 translate-x-1/2 h-0.5 transition-colors duration-300
                      ${status === 'completed' ? 'bg-blue-600' : 'bg-gray-200'}
                    `}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default ProgressStepper;
