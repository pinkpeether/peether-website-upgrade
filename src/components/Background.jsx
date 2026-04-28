import ParticleCanvas from "./ParticleCanvas";

/**

Global Background Component
Now uses the shared ParticleCanvas component
Simplified from 70+ lines to just a few lines
*/
export default function Background() {
return ( <div className="fixed top-0 left-0 w-full h-full z-0"> <ParticleCanvas particleCount={60} className="opacity-90" /> </div>
);
}