create a folder for a video trasncoded files ts files

transcode to that folder

upload all the files in that folder to s3

delete that folder

repeat for other resolutions

todo do for s3 upload event


# todo 
add github action caches

decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));



### no creds only make policy for lambda function
### correct permission for lambda function
### decodeURIComponent
###  get is not enough list is good too 403 
###  lamda and s3 bucket shoud be in same regeion 
### shell true 
  let rm = spawnSync("rm", ["-r", `${path}`], {
    encoding: "utf8",
    shell: true,
  });




  ## test with long videos downlaoded from uuuu


{
"Version": "2012-10-17",
"Statement": [
{
"Effect": "Allow",
"Action": "s3:Put*",
"Resource": "arn:aws:s3:::resource-platform-vod/*"
}
]
}




#
# Github Actions for Serverless Framework
#
# Create AWS_KEY and AWS_SECRET secrets in Github repository settings
# If you're using env.yml file, store its content as ENV Github secret
#
# Master branch will be deployed as DEV and every new tag starting with "v**" (e.g. v1.0, v1.2, v2.0, etc) will be deployed as PROD
#
# Learn more: https://maxkostinevich.com/blog/how-to-deploy-serverless-applications-using-github-actions/
#


name: Deploy Dev
on:
  push:
    branches:
      - master
jobs:
  deploy-dev:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - uses: actions/setup-node@v1
      with:
        node-version: '10.x'
    - name: Install Serverless Framework
      run: npm install -g serverless
    - name: Serverless AWS authentication
      run: sls config credentials --provider aws --key ${{ secrets.AWS_KEY }} --secret ${{ secrets.AWS_SECRET }}
    - name: Create env file
      run: | # cp sample.env.yml env.yml
        cat > env.yml << EOF
        ${{ secrets.ENV }}
        EOF
    - name: Install NPM dependencies
      run: npm install
    # Optional
    #- name: Build assets
    #  run: npm run assets-dev
    - name: Deploy Lambda functions
      run: sls deploy -s dev
    # Optional (to use with serverless-finch serverless plugin)
    #- name: Deploy assets to S3
    #  run: sls client deploy --no-delete-contents --no-confirm -s dev