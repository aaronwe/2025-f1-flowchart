// @ts-nocheck

import React, { useState } from 'react';
import { Trophy, Flag, AlertCircle, ChevronDown, ChevronRight, Check, X } from 'lucide-react';

const F1Flowchart = () => {
  const [hoveredPath, setHoveredPath] = useState(null);

  const drivers = {
    norris: { name: 'Lando Norris', team: 'McLaren', color: 'bg-orange-500', text: 'text-orange-500', border: 'border-orange-500', bgLight: 'bg-orange-50' },
    verstappen: { name: 'Max Verstappen', team: 'Red Bull', color: 'bg-blue-800', text: 'text-blue-800', border: 'border-blue-800', bgLight: 'bg-blue-50' },
    piastri: { name: 'Oscar Piastri', team: 'McLaren', color: 'bg-orange-400', text: 'text-orange-400', border: 'border-orange-400', bgLight: 'bg-orange-50' },
  };

  const WinnerCard = ({ driverKey }) => {
    const driver = drivers[driverKey];
    return (
      <div className={`flex items-center gap-3 p-4 rounded-lg border-l-4 shadow-lg animate-in fade-in slide-in-from-top-4 duration-500 ${driver.bgLight} ${driver.border} w-full max-w-sm`}>
        <div className={`p-2 rounded-full ${driver.color} text-white`}>
          <Trophy size={20} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Champion</p>
          <p className={`text-lg font-black uppercase ${driver.text}`}>{driver.name}</p>
        </div>
      </div>
    );
  };

  const DecisionNode = ({ 
    id, 
    question, 
    yesLabel = "Yes", 
    noLabel = "No", 
    onYes, 
    onNo, 
    isLast = false 
  }) => {
    return (
      <div className="flex flex-col relative">
        {/* Main Question Box */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-white border-2 border-gray-800 text-gray-900 px-6 py-4 rounded-xl shadow-md font-bold text-center w-64">
            {question}
          </div>
        </div>

        {/* Branches */}
        <div className="flex justify-between mt-4 w-full gap-4 md:gap-12 relative">
          
          {/* YES BRANCH (Right side logic visually, but mapped to first child) */}
          <div className="flex flex-col items-center flex-1 relative">
            <div className="absolute top-0 left-1/2 w-[2px] h-6 bg-gray-300 -translate-y-4 -translate-x-1/2"></div>
            {/* Horizontal connector to the Yes side */}
            <div className="absolute top-0 right-1/2 w-1/2 h-[2px] bg-green-500 -translate-y-4"></div>
             <div className="absolute top-0 right-0 w-[2px] h-4 bg-green-500 -translate-y-4"></div>

            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded mb-2 z-10 border border-green-200">
              {yesLabel}
            </span>
            {onYes}
          </div>

          {/* NO BRANCH (Left side logic/continuation) */}
          <div className="flex flex-col items-center flex-1 relative">
             {/* Horizontal connector to the No side */}
            <div className="absolute top-0 left-1/2 w-1/2 h-[2px] bg-red-400 -translate-y-4"></div>
            <div className="absolute top-0 left-0 w-[2px] h-4 bg-red-400 -translate-y-4"></div>
            
            <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded mb-2 z-10 border border-red-200">
              {noLabel}
            </span>
            {onNo}
          </div>
        </div>
      </div>
    );
  };

  // A different layout style for the linear flow requested
  // Vertical Stack for the "No" chain, with "Yes" branching out
  const LinearStep = ({ number, question, yesContent, noContent, isLast }) => (
    <div className="flex gap-4 md:gap-8 relative pb-12 group">
      {!isLast && (
        <div className="absolute left-[26px] top-12 bottom-0 w-1 bg-gray-200 group-hover:bg-gray-300 transition-colors" />
      )}
      
      {/* Number/Icon Column */}
      <div className="flex flex-col items-center flex-shrink-0 z-10">
        <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xl border-4 border-white shadow-sm ring-1 ring-gray-200">
          {number}
        </div>
      </div>

      {/* Content Column */}
      <div className="flex-1 pt-2">
        {/* Question Card */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow mb-6 max-w-md">
          <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <AlertCircle size={18} className="text-slate-400" />
            {question}
          </h3>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* YES Path */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px bg-green-500 w-8" />
              <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded uppercase">Yes</span>
            </div>
            <div className="pl-4 border-l-2 border-green-100 md:border-l-0 md:pl-0">
               {yesContent}
            </div>
          </div>

          {/* NO Path */}
          {!isLast && (
             <div className="flex-1 opacity-60 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px bg-red-400 w-8" />
                  <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded uppercase">No</span>
                </div>
                <div className="text-sm text-gray-500 italic flex items-center gap-2">
                  Next Scenario <ChevronDown size={14} />
                </div>
             </div>
          )}
          {/* For the final fallback */}
          {isLast && noContent && (
             <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px bg-red-400 w-8" />
                  <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded uppercase">No</span>
                </div>
                <div className="pl-4 border-l-2 border-red-100 md:border-l-0 md:pl-0">
                  {noContent}
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );

  const SubDecision = ({ condition, yesResult, noResult }) => (
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
      <div className="flex items-start gap-2 mb-4">
        <div className="mt-1">
          <Flag size={16} className="text-slate-500" />
        </div>
        <p className="text-sm font-semibold text-slate-700">{condition}</p>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="w-8 text-xs font-bold text-center bg-green-100 text-green-800 rounded px-1">YES</span>
          <div className="flex-1">{yesResult}</div>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-8 text-xs font-bold text-center bg-red-100 text-red-800 rounded px-1">NO</span>
          <div className="flex-1">{noResult}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Header */}
      <div className="bg-slate-900 text-white py-12 px-4 shadow-xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-red-500 font-bold tracking-widest text-sm mb-2">
            ABU DHABI 2025 <Flag size={14} fill="currentColor" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-4">
            CHAMPIONSHIP SCENARIOS
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Follow the decision tree to see who takes the crown based on the final race results.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-slate-200">
          
          {/* STEP 1 */}
          <LinearStep 
            number="1"
            question="Is Lando Norris on the podium (1st, 2nd, or 3rd)?"
            yesContent={<WinnerCard driverKey="norris" />}
          />

          {/* STEP 2 */}
          <LinearStep 
            number="2"
            question="Did Max Verstappen win the race?"
            yesContent={
              <SubDecision 
                condition="Did Norris finish 4th or lower?"
                yesResult={<WinnerCard driverKey="verstappen" />}
                noResult={<WinnerCard driverKey="norris" />}
              />
            }
          />

          {/* STEP 3 */}
          <LinearStep 
            number="3"
            question="Did Oscar Piastri win the race?"
            yesContent={
              <SubDecision 
                condition="Did Norris finish 6th or lower?"
                yesResult={<WinnerCard driverKey="piastri" />}
                noResult={<WinnerCard driverKey="norris" />}
              />
            }
          />

          {/* STEP 4 */}
          <LinearStep 
            number="4"
            question="Did Verstappen finish 2nd?"
            yesContent={
              <SubDecision 
                condition="Did Norris finish 8th or lower?"
                yesResult={<WinnerCard driverKey="verstappen" />}
                noResult={<WinnerCard driverKey="norris" />}
              />
            }
          />

           {/* STEP 5 */}
           <LinearStep 
            number="5"
            question="Did Verstappen finish 3rd?"
            yesContent={
              <SubDecision 
                condition="Did Norris finish 9th or lower?"
                yesResult={<WinnerCard driverKey="verstappen" />}
                noResult={<WinnerCard driverKey="norris" />}
              />
            }
          />

          {/* STEP 6 */}
          <LinearStep 
            number="6"
            isLast={true}
            question="Did Piastri finish 2nd?"
            yesContent={
              <SubDecision 
                condition="Did Norris finish 10th or lower?"
                yesResult={<WinnerCard driverKey="piastri" />}
                noResult={<WinnerCard driverKey="norris" />}
              />
            }
            noContent={
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-2 font-medium">Any other result:</p>
                <WinnerCard driverKey="norris" />
              </div>
            }
          />

        </div>
      </div>
      
      <div className="text-center text-slate-400 text-sm pb-8">
        Built with React • F1 2025 Championship Visualizer
      </div>
    </div>
  );
};

export default F1Flowchart;