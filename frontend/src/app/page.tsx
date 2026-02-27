import ScoreDashboard from './components/ScoreDashboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl py-20">
        <ScoreDashboard />
      </div>
    </main>
  );
}
