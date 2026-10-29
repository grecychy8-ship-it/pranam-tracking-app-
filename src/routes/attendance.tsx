import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Camera, CheckCircle2, LogIn, LogOut, X } from "lucide-react";
import { PageHeader } from "@/components/app/kit";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/attendance")({
  head: () => seo("Attendance", "Camera-based employee check-in and check-out."),
  component: Attendance,
});

type AttendanceAction = "checkIn" | "checkOut";

type DailyAttendance = {
  employeeName: string;
  employeeId: string;
  date: string;
  checkInTime?: string;
  checkInPhoto?: string;
  checkOutTime?: string;
  checkOutPhoto?: string;
};

function todayKey() {
  const date = new Date().toISOString().slice(0, 10);
  return `pranam-attendance-${date}`;
}

function Attendance() {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [record, setRecord] = useState<DailyAttendance | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [action, setAction] = useState<AttendanceAction>("checkIn");
  const [error, setError] = useState("");
  const [startingCamera, setStartingCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(todayKey());
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as DailyAttendance;
      setRecord(parsed);
      setEmployeeName(parsed.employeeName);
      setEmployeeId(parsed.employeeId);
    } catch {
      localStorage.removeItem(todayKey());
    }
  }, []);

  useEffect(() => () => stopCamera(), []);

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }

  function closeCamera() {
    stopCamera();
    setCameraOpen(false);
  }

  async function openCamera(nextAction: AttendanceAction) {
    setError("");
    if (!employeeName.trim() || !employeeId.trim()) {
      setError("Enter employee name and employee ID first.");
      return;
    }

    setAction(nextAction);
    setCameraOpen(true);
    setStartingCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch {
      setError("Camera access was blocked. Allow camera permission in your browser and try again.");
      setCameraOpen(false);
      stopCamera();
    } finally {
      setStartingCamera(false);
    }
  }

  function captureAttendance() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !video.videoWidth || !video.videoHeight) {
      setError("Camera is not ready yet. Please wait a moment and try again.");
      return;
    }

    const maxWidth = 720;
    const scale = Math.min(1, maxWidth / video.videoWidth);
    canvas.width = Math.round(video.videoWidth * scale);
    canvas.height = Math.round(video.videoHeight * scale);
    const context = canvas.getContext("2d");
    if (!context) return;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const photo = canvas.toDataURL("image/jpeg", 0.78);
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const base: DailyAttendance = record ?? {
      employeeName: employeeName.trim(),
      employeeId: employeeId.trim(),
      date: now.toLocaleDateString(),
    };
    const updated: DailyAttendance = action === "checkIn"
      ? { ...base, employeeName: employeeName.trim(), employeeId: employeeId.trim(), checkInTime: time, checkInPhoto: photo }
      : { ...base, checkOutTime: time, checkOutPhoto: photo };

    localStorage.setItem(todayKey(), JSON.stringify(updated));
    setRecord(updated);
    closeCamera();
  }

  const checkedIn = Boolean(record?.checkInTime);
  const checkedOut = Boolean(record?.checkOutTime);

  return (
    <>
      <PageHeader title="Attendance" subtitle="Live photo check-in and check-out" icon={CalendarCheck} tone="bg-pastel-pink" ink="text-accent" />

      <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-7">
        <div className="space-y-4">
          <div>
            <label htmlFor="employee-name" className="mb-1.5 block text-sm font-semibold">Employee name</label>
            <input
              id="employee-name"
              value={employeeName}
              onChange={(event) => setEmployeeName(event.target.value)}
              disabled={checkedIn}
              placeholder="Enter your full name"
              autoComplete="name"
              className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:opacity-65"
            />
          </div>
          <div>
            <label htmlFor="employee-id" className="mb-1.5 block text-sm font-semibold">Employee ID</label>
            <input
              id="employee-id"
              value={employeeId}
              onChange={(event) => setEmployeeId(event.target.value)}
              disabled={checkedIn}
              placeholder="Enter employee ID"
              autoComplete="off"
              className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:opacity-65"
            />
          </div>

          {error && <p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">{error}</p>}

          {record && (
            <div className="rounded-2xl bg-pastel-green p-4">
              <div className="flex items-center gap-2 font-bold text-success"><CheckCircle2 className="h-5 w-5" /> Today's attendance</div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div><span className="block text-xs text-muted-foreground">Check in</span><strong>{record.checkInTime ?? "Not marked"}</strong></div>
                <div><span className="block text-xs text-muted-foreground">Check out</span><strong>{record.checkOutTime ?? "Pending"}</strong></div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => openCamera("checkIn")}
              disabled={checkedIn}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
            >
              <LogIn className="h-5 w-5" /> {checkedIn ? "Checked In" : "Check In"}
            </button>
            <button
              type="button"
              onClick={() => openCamera("checkOut")}
              disabled={!checkedIn || checkedOut}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-bold text-accent-foreground transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
            >
              <LogOut className="h-5 w-5" /> {checkedOut ? "Checked Out" : "Check Out"}
            </button>
          </div>
          <p className="text-center text-xs text-muted-foreground">A live camera photo and the current time are recorded automatically. File uploads are disabled.</p>
        </div>
      </div>

      {cameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" role="dialog" aria-modal="true" aria-label={`${action === "checkIn" ? "Check in" : "Check out"} camera`}>
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-card shadow-lift">
            <div className="flex items-center justify-between border-b border-border p-4">
              <div>
                <h2 className="font-bold">{action === "checkIn" ? "Check In" : "Check Out"} photo</h2>
                <p className="text-xs text-muted-foreground">Position your face clearly in the camera.</p>
              </div>
              <button type="button" onClick={closeCamera} aria-label="Close camera" className="grid h-10 w-10 place-items-center rounded-full bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <div className="relative aspect-[4/3] bg-black">
              <video ref={videoRef} autoPlay muted playsInline className="h-full w-full object-cover [transform:scaleX(-1)]" />
              {startingCamera && <div className="absolute inset-0 grid place-items-center text-sm font-semibold text-white">Opening camera…</div>}
            </div>
            <div className="p-4">
              <button type="button" onClick={captureAttendance} disabled={startingCamera} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 font-bold text-primary-foreground disabled:opacity-50">
                <Camera className="h-5 w-5" /> Capture & {action === "checkIn" ? "Check In" : "Check Out"}
              </button>
            </div>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
}
