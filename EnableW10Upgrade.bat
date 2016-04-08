@echo off
Setlocal EnableDelayedExpansion

set "str=\system32"
set "strPath=%windir%%str%"

reg delete HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\GWX /v DisableGWX /f > NULL
regedit /s EnableW10Upgrade.reg

for /r %strPath% %%a in (*) do (
    if /I "%%~nxa"=="gwx1.exe" (
        set p=%%~dpnxa  
        set pa=%%~dpa
    )
)

if defined p (  
    if !pa:~-1!==\ SET pa=!pa:~0,-1!
    REM echo !pa!    
    takeown /F %p% /A > NUL
    ICACLS %p% /grant "*S-1-5-32-544:(D,WDAC)" > NUL
    ren %p% GWX.exe
)

schtasks /query /TN "\Microsoft\Windows\Setup\gwx\launchtrayprocess" > NUL
if "%ERRORLEVEL%"=="0" schtasks /change /TN "\Microsoft\Windows\Setup\gwx\launchtrayprocess" /ENABLE > NUL

if exist "%strPath%\GWX\GWX.exe"  %strPath%\GWX\GWX.exe /tasklaunch

Echo Windows 10 Update is enabled.


pause