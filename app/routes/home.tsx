import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv, fs, isLoading } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate('/auth?next=/');
    }
  }, [isLoading, auth.isAuthenticated, navigate]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      try {
        const items = (await kv.list('resume:*', true)) as any[];
        if (items && items.length > 0) {
          const parsedResumes = await Promise.all(items.map(async (item) => {
            const parsed = JSON.parse(item.value) as Resume;
            if (parsed.imagePath) {
              try {
                const imageBlob = await fs.read(parsed.imagePath);
                if (imageBlob) {
                  const imgBlob = new Blob([imageBlob], { type: 'image/png' });
                  parsed.imagePath = URL.createObjectURL(imgBlob);
                }
              } catch (e) {
                console.error("Failed to load resume image", parsed.imagePath, e);
              }
            }
            return parsed;
          }));
          setResumes(parsedResumes);
        } else {
          setResumes([]);
        }
      } catch (err) {
        console.error("Failed to load resumes from Puter KV:", err);
      } finally {
        setLoadingResumes(false);
      }
    };

    if (!isLoading && auth.isAuthenticated) {
      loadResumes();
    }
  }, [isLoading, auth.isAuthenticated, kv, fs]);

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />

    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track Your Applications & Resume Ratings</h1>
        {!loadingResumes && resumes?.length === 0 ? (
          <h2>No resumes found. Upload your first resume to get feedback.</h2>
        ) : (
          <h2>Review your submissions and check AI-powered feedback.</h2>
        )}
      </div>
      {loadingResumes && (
        <div className="flex flex-col items-center justify-center">
          <img src="/images/resume-scan-2.gif" className="w-[200px]" />
        </div>
      )}

      {!loadingResumes && resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}

    </section>
  </main>
}