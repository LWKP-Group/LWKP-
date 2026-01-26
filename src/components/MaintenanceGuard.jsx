"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function MaintenanceGuard({ posts }) {
  const router = useRouter();
  const timerRef = useRef(null);
  const [expired, setExpired] = useState(false);

  // ⏳ 5 sec ka wait
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setExpired(true);
    }, 5000); // 3 sec chaho to 3000

    return () => clearTimeout(timerRef.current);
  }, []);

  // ✅ Agar data aa gaya → timer cancel
  useEffect(() => {
    if (posts && posts.length > 0) {
      clearTimeout(timerRef.current);
    }
  }, [posts]);

  // ❌ Timeout + still empty → maintenance
  useEffect(() => {
    if (expired && (!posts || posts.length === 0)) {
      router.replace("/maintenance");
    }
  }, [expired, posts, router]);

  // 👻 UI kuch bhi show nahi karega
  return null;
}
