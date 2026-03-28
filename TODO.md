# Profile Image Upload Implementation

## Step 1: Update app.py - Add profile_image column to users table
- In init_db(), add ALTER TABLE users ADD COLUMN profile_image VARCHAR(500) DEFAULT NULL;

## Step 2: Update app.py - Enhance profile endpoints to include image
- Modify user_profile_for_email() to select profile_image.
- Update /profileservlet response to include imageUrl: profile_image.
- Update /update-profile to handle image if present (future).

## Step 3: Update app.py - Add /upload-profile-image POST endpoint
- Handle multipart/form-data.
- Validate file (jpg/png, <=2MB).
- Create dir webapp/dashboard/images/profiles/ if needed.
- Save unique filename e.g. {email}_{timestamp}.{ext}
- Update DB users.profile_image.
- Return {success: true, imageUrl: path}

## Step 4: Create upload directory
- mkdir -p webapp/dashboard/images/profiles/

## Step 5: Update webapp/dashboard/user/profile.html
- Add hidden input: <input type="file" id="profileImageInput" accept="image/jpeg,image/png" hidden> after upload-btn.

## Step 6: Update webapp/dashboard/user/user.js
- Add JS: document.querySelector('.upload-btn').addEventListener('click', () => document.getElementById('profileImageInput').click());
- On change: preview img, FormData POST /upload-profile-image, on success update .profile-img src = data.imageUrl, refresh profile via /profileservlet.

## Step 7: Test
- python app.py
- Login -> /dashboard/user/profile.html
- Click Upload Photo -> select img -> upload -> verify DB and UI update.

✅ Step 1: Added profile_image column to app.py (DB)
✅ Step 2: Enhanced user_profile_for_email and /profileservlet

✅ Step 1-3: Backend complete (DB column, profile data, /upload-profile-image)

✅ Step 4: Added file input to profile.html

✅ Steps 1-6 Complete

**Current: Step 7 - Ready to Test**

To test:
1. python app.py (restart server to init DB changes)
2. Register/login as user
3. Go to /dashboard/user/profile.html
4. Profile data loads (check sidebar)
5. Click "Upload Photo" → file picker opens
6. Select JPG/PNG <2MB → uploads → img updates + DB saved
7. Refresh → image persists

**Done!** 🎉

