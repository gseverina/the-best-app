Steps to build:

ionic build android --release
cp platforms/android/build/outputs/apk/android-release-unsigned.apk builds/
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore thebest.keystore builds/android-release-unsigned.apk thebest
/c/Program\ Files\ \(x86\)/Android/android-studio/sdk/build-tools/22.0.1/zipalign  -v 4 builds/android-release-unsigned.apk builds/thebest.apk

