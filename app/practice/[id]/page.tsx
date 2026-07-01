import React from 'react';
import PracticeClient from './PracticeClient';

export default async function PracticePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <PracticeClient id={resolvedParams.id} />;
}
