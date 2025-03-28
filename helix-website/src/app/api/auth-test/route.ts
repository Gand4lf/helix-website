
import { NextResponse } from 'next/server';
import { AuthGetCurrentUserServer } from '@/lib/amplify-server';

export async function GET() {
    console.log('Getting current user');
  try {
    const user = await AuthGetCurrentUserServer();
    
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Return user information (customize based on your needs)
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in user route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}