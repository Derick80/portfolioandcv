'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const UniqueVisitors: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/visitors')
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(console.error);
  }, []);

  if (count === null) {
    return <p className="text-center py-4">Loading visitor count…</p>;
  }

  return (
    <Card className="hidden max-w-xs mx-auto mt-6">
      <CardContent className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">Unique Visitors</p>
        <p className="mt-1 text-2xl font-bold">{count}</p>
      </CardContent>
    </Card>
  );
};

export default UniqueVisitors;
