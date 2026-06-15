@REM @echo off
@REM setlocal

@REM echo ================================
@REM echo   KV SCHOOL WEBSITE BACKUP (7-ZIP FAST MODE)
@REM echo ================================

@REM :: ---- CONFIG ----
@REM set PROJECT_DIR=D:\kvschoolwebsite_mongodb
@REM set BACKUP_DIR=D:\FullBackup-kvschool
@REM set ATLAS_URI=mongodb+srv://kkbhardwajsharma1234_db_user:1wqdhBpQfpg5u0pe@cluster0.dxrakgd.mongodb.net/kv_school_db?retryWrites=true&w=majority
@REM set ZIP_NAME=FullBackup-kvschool.zip
@REM set ZIP_EXE="C:\Program Files\7-Zip\7z.exe"

@REM :: ---- Check 7-Zip Exists ----
@REM if not exist %ZIP_EXE% (
@REM     echo ERROR: 7-Zip not found at %ZIP_EXE%
@REM     echo Please install 7-Zip from https://www.7-zip.org/
@REM     pause
@REM     exit /b
@REM )

@REM :: ---- Clean Old Backup ----
@REM echo Removing old backup folder...
@REM rmdir /s /q "%BACKUP_DIR%" 2>nul
@REM mkdir "%BACKUP_DIR%"

@REM :: ---- Backup MongoDB Atlas ----
@REM echo Taking MongoDB backup...
@REM mongodump --uri "%ATLAS_URI%" --out "%BACKUP_DIR%\mongodb-backup"

@REM :: ---- Copy Project Files ----
@REM echo Copying frontend and backend...
@REM xcopy "%PROJECT_DIR%\frontend" "%BACKUP_DIR%\frontend" /E /I /Q
@REM xcopy "%PROJECT_DIR%\backend" "%BACKUP_DIR%\backend" /E /I /Q

@REM :: ---- Copy .env if exists ----
@REM if exist "%PROJECT_DIR%\backend\.env" copy "%PROJECT_DIR%\backend\.env" "%BACKUP_DIR%\backend\.env"
@REM if exist "%PROJECT_DIR%\frontend\.env" copy "%PROJECT_DIR%\frontend\.env" "%BACKUP_DIR%\frontend\.env"

@REM :: ---- Create ZIP using 7-Zip ----
@REM echo Creating ZIP (Ultra Fast)...
@REM %ZIP_EXE% a -tzip "%PROJECT_DIR%\%ZIP_NAME%" "%BACKUP_DIR%\*" -mx=1

@REM echo.
@REM echo Backup Completed Successfully!
@REM echo ZIP File: %PROJECT_DIR%\%ZIP_NAME%
@REM echo.
@REM pause










@echo off
setlocal

echo ================================
echo   KV SCHOOL WEBSITE FULL BACKUP
echo ================================

:: ---- CONFIG ----
set PROJECT_DIR=D:\kvschoolwebsite_mongodb
set BACKUP_DIR=D:\FullBackup-kvschool
set ATLAS_URI=mongodb+srv://kkbhardwajsharma1234_db_user:1wqdhBpQfpg5u0pe@cluster0.dxrakgd.mongodb.net/kv_school_db?retryWrites=true&w=majority
set ZIP_NAME=FullBackup-kvschool.zip
set ZIP_EXE="C:\Program Files\7-Zip\7z.exe"

:: ---- Check 7-Zip ----
if not exist %ZIP_EXE% (
    echo ERROR: 7-Zip not found at %ZIP_EXE%
    pause
    exit /b
)

:: ---- Clean Old Backup ----
echo Removing old backup folder...
rmdir /s /q "%BACKUP_DIR%" 2>nul
mkdir "%BACKUP_DIR%"

:: ---- MongoDB Backup ----
echo Taking MongoDB backup...
mongodump --uri "%ATLAS_URI%" --out "%BACKUP_DIR%\mongodb-backup"

:: ---- Copy Project Folders ----
echo Copying backend and frontend folders...
xcopy "%PROJECT_DIR%\backend" "%BACKUP_DIR%\backend" /E /I /Q
xcopy "%PROJECT_DIR%\frontendfirst" "%BACKUP_DIR%\frontendfirst" /E /I /Q
xcopy "%PROJECT_DIR%\frontendsecond" "%BACKUP_DIR%\frontendsecond" /E /I /Q

:: ---- Copy .env files if exist ----
if exist "%PROJECT_DIR%\backend\.env" copy "%PROJECT_DIR%\backend\.env" "%BACKUP_DIR%\backend\.env"
if exist "%PROJECT_DIR%\frontendfirst\.env" copy "%PROJECT_DIR%\frontendfirst\.env" "%BACKUP_DIR%\frontendfirst\.env"
if exist "%PROJECT_DIR%\frontendsecond\.env" copy "%PROJECT_DIR%\frontendsecond\.env" "%BACKUP_DIR%\frontendsecond\.env"

:: ---- Create ZIP using 7-Zip (Ultra Fast) ----
echo Creating ZIP archive...
%ZIP_EXE% a -tzip "%PROJECT_DIR%\%ZIP_NAME%" "%BACKUP_DIR%\*" -mx=1

echo.
echo Backup Completed Successfully!
echo ZIP File: %PROJECT_DIR%\%ZIP_NAME%
echo.
pause
